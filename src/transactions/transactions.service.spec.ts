import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { PortfolioStoreService } from '../portfolio/portfolio-store/portfolio-store.service';
import { TransactionLogService } from './transaction-log/transaction-log.service';
import { VendorService } from '../vendor/vendor.service';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let vendorService: VendorService;

   beforeEach(() => {
    vendorService = {
      getStockBySymbol: jest.fn().mockResolvedValue({ price: 100, symbol: 'AAPL' }),
    } as any;

    service = new TransactionsService(
      vendorService,
      new PortfolioStoreService(),
      new TransactionLogService(),
    );
  });

   it('returns success for valid price within 2%', async () => {
    const result = await service.buyStock('u1', 'AAPL', 100, 1);
    expect(result.success).toBe(true);
  });

  it('returns failure if price is outside 2%', async () => {
    const result = await service.buyStock('u1', 'AAPL', 120, 1);
    expect(result.success).toBe(false);
  });

  it('returns failure if stock not found', async () => {
    vendorService.getStockBySymbol = jest.fn().mockResolvedValue(null);
    const result = await service.buyStock('u1', 'FAKE', 10, 1);
    expect(result.success).toBe(false);
    expect(result.message).toContain('not found');
  });
});

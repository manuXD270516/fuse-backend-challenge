import { StocksService } from './stocks.service';
import { VendorService } from '../vendor/vendor.service';

describe('StocksService', () => {
  let stocksService: StocksService;
  let vendorService: VendorService;

  beforeEach(() => {
    vendorService = {
      getStocks: jest.fn().mockResolvedValue({
        data: { items: [{ symbol: 'AAPL' }], nextToken: null },
      }),
    } as any;

    stocksService = new StocksService(vendorService);
  });

  it('should delegate getStocks to VendorService', async () => {
    const result = await stocksService.getStocks();
    expect(vendorService.getStocks).toHaveBeenCalled();
    expect(result).toEqual({
      data: { items: [{ symbol: 'AAPL' }], nextToken: null },
    });
  });
});

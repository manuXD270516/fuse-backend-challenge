import { Test, TestingModule } from '@nestjs/testing';
import { TransactionLogService } from './transaction-log.service';

describe('TransactionLogService', () => {
  let service: TransactionLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionLogService],
    }).compile();

    service = module.get<TransactionLogService>(TransactionLogService);
  });

  it('logs transactions with timestamp', () => {
    service.log({
      userId: 'u1',
      symbol: 'TSLA',
      requestedPrice: 100,
      currentPrice: 100,
      quantity: 1,
      success: true,
    });

    const logs = service.getLogs();
    expect(logs).toHaveLength(1);
    expect(logs[0]).toMatchObject({ symbol: 'TSLA', success: true });
    expect(logs[0].timestamp).toBeInstanceOf(Date);
  });
});

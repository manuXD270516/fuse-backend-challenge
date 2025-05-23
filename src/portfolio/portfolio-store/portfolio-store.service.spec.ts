import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioStoreService } from './portfolio-store.service';

describe('PortfolioStoreService', () => {
  let service: PortfolioStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortfolioStoreService],
    }).compile();

    service = module.get<PortfolioStoreService>(PortfolioStoreService);
  });

   it('initializes with empty portfolio', () => {
    expect(service.getPortfolio('user1')).toEqual({});
  });

  it('adds to portfolio correctly', () => {
    service.addToPortfolio('user1', 'AAPL', 2);
    expect(service.getPortfolio('user1')).toEqual({ AAPL: 2 });

    service.addToPortfolio('user1', 'AAPL', 3);
    expect(service.getPortfolio('user1')).toEqual({ AAPL: 5 });
  });
});

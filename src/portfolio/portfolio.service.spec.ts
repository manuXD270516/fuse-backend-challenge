import { PortfolioStoreService } from './portfolio-store/portfolio-store.service';

describe('PortfolioStoreService', () => {
  let service: PortfolioStoreService;

  beforeEach(() => {
    service = new PortfolioStoreService();
  });

  it('should return an empty object if user has no portfolio', () => {
    const portfolio = service.getPortfolio('user1');
    expect(portfolio).toEqual({});
  });

  it('should add a new stock to a user portfolio', () => {
    service.addToPortfolio('user1', 'AAPL', 3);
    const result = service.getPortfolio('user1');
    expect(result).toEqual({ AAPL: 3 });
  });

  it('should increment quantity if stock already exists in portfolio', () => {
    service.addToPortfolio('user1', 'AAPL', 2);
    service.addToPortfolio('user1', 'AAPL', 3);
    const result = service.getPortfolio('user1');
    expect(result).toEqual({ AAPL: 5 });
  });

  it('should allow multiple symbols for the same user', () => {
    service.addToPortfolio('user1', 'AAPL', 2);
    service.addToPortfolio('user1', 'TSLA', 1);
    const result = service.getPortfolio('user1');
    expect(result).toEqual({ AAPL: 2, TSLA: 1 });
  });

  it('should isolate portfolios per user', () => {
    service.addToPortfolio('user1', 'AAPL', 1);
    service.addToPortfolio('user2', 'TSLA', 4);

    const portfolio1 = service.getPortfolio('user1');
    const portfolio2 = service.getPortfolio('user2');

    expect(portfolio1).toEqual({ AAPL: 1 });
    expect(portfolio2).toEqual({ TSLA: 4 });
  });
});

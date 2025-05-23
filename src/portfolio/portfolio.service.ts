import { Injectable } from '@nestjs/common';
import { TransactionsService } from '../transactions/transactions.service';

@Injectable()
export class PortfolioService {
  constructor(private readonly transactionsService: TransactionsService) {}

  getUserPortfolio(userId: string) {
    return this.transactionsService.getPortfolio(userId);
  }
}

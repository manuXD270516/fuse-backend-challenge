import { Injectable } from '@nestjs/common';

@Injectable()
export class PortfolioStoreService {
  private portfolios: Record<string, Record<string, number>> = {};

  getPortfolio(userId: string): Record<string, number> {
    return this.portfolios[userId] ?? {};
  }

  addToPortfolio(userId: string, symbol: string, quantity: number) {
    this.portfolios[userId] ??= {};
    this.portfolios[userId][symbol] = (this.portfolios[userId][symbol] || 0) + quantity;
  }
}

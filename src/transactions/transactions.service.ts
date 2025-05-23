import { Injectable } from '@nestjs/common';
import { VendorService } from '../vendor/vendor.service';
import { PortfolioStoreService } from '../portfolio/portfolio-store/portfolio-store.service';
import { TransactionLogService } from './transaction-log/transaction-log.service';
import { isPriceWithinPercentage } from '../common/utils/price-check.util';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly vendorService: VendorService,
    private readonly portfolioStore: PortfolioStoreService,
    private readonly transactionLog: TransactionLogService,
  ) {}

  async buyStock(
    userId: string,
    symbol: string,
    price: number,
    quantity: number,
  ) {
    try {
      const stock = await this.vendorService.getStockBySymbol(symbol);
      if (!stock) {
        return {
          success: false,
          message: 'Stock not found',
        };
      }

      const currentPrice = stock.price;
      const success = isPriceWithinPercentage(currentPrice, price, 2);

      // Log transaction
      this.transactionLog.log({
        userId,
        symbol,
        requestedPrice: price,
        currentPrice,
        quantity,
        success,
      });

      if (!success) {
        return {
          success: false,
          message: 'Price out of acceptable range (±2%)',
        };
      }

      // Update portfolio
      this.portfolioStore.addToPortfolio(userId, symbol, quantity);

      return {
        success: true,
        message: 'Transaction completed',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Transaction failed',
        error: error.message,
      };
    }
  }

  getPortfolio(userId: string) {
    return this.portfolioStore.getPortfolio(userId);
  }

  getTransactionLogs() {
    return this.transactionLog.getLogs();
  }
}

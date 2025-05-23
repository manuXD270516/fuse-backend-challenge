import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { isPriceWithin2Percent } from '../common/utils/price-check.util';

@Injectable()
export class TransactionsService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  // In-memory store: { userId: { symbol: quantity } }
  private readonly portfolios: Record<string, Record<string, number>> = {};
  private readonly logs: any[] = [];

  constructor(private config: ConfigService) {
    this.apiKey = this.config.get('VENDOR_API_KEY');
    this.baseUrl = this.config.get('VENDOR_BASE_URL');
  }

  async buyStock(userId: string, symbol: string, price: number, quantity: number) {
    try {
      const vendorResponse = await axios.get(`${this.baseUrl}/stocks`, {
        headers: { 'x-api-key': this.apiKey },
      });

      const stock = vendorResponse.data.data.items.find((item) => item.symbol === symbol);
      if (!stock) throw new Error('Stock not found');

      const currentPrice = stock.price;

      const success = isPriceWithin2Percent(currentPrice, price);

      this.logs.push({
        userId,
        symbol,
        requestedPrice: price,
        currentPrice,
        quantity,
        success,
        timestamp: new Date(),
      });

      if (!success) {
        return { success: false, message: 'Price out of acceptable range (±2%)' };
      }

      // Update portfolio
      this.portfolios[userId] ??= {};
      this.portfolios[userId][symbol] = (this.portfolios[userId][symbol] || 0) + quantity;

      return { success: true, message: 'Transaction completed' };
    } catch (error) {
      return { success: false, message: 'Transaction failed', error: error.message };
    }
  }

  getPortfolio(userId: string) {
    return this.portfolios[userId] ?? {};
  }

  getTransactionLogs() {
    return this.logs;
  }
}

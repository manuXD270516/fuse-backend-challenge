import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VendorService {
  constructor(private readonly configService: ConfigService) {}

  private get baseUrl(): string {
    return this.configService.get<string>('VENDOR_BASE_URL');
  }

  private get apiKey(): string {
    return this.configService.get<string>('VENDOR_API_KEY');
  }

  async getStocks(nextToken?: string): Promise<any> {
    try {
      const url = `${this.baseUrl}/stocks${nextToken ? `?nextToken=${nextToken}` : ''}`;
      const response = await axios.get(url, {
        headers: { 'x-api-key': this.apiKey },
      });
      return response.data;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching stocks from vendor API');
    }
  }

  async getStockBySymbol(symbol: string): Promise<any | null> {
    const data = await this.getStocks();
    return data.data.items.find((s) => s.symbol === symbol) || null;
  }
}

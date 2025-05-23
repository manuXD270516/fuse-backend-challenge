import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class StocksService {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.baseUrl = this.configService.get<string>('VENDOR_BASE_URL');
    this.apiKey = this.configService.get<string>('VENDOR_API_KEY');
  }

  /**
   * Fetch stocks from vendor API
   * @param nextToken optional pagination token
   * @returns stocks list and nextToken (if any)
   */
  async getStocks(nextToken?: string): Promise<any> {
    try {
      const url = `${this.baseUrl}/stocks${nextToken ? `?nextToken=${nextToken}` : ''}`;
    
      console.log('x-api-key', this.apiKey);
      const response = await axios.get(url, {
        headers: {
          'x-api-key': this.apiKey,
        },
      });

      return response.data;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching stocks from vendor API',
      );
    }
  }
}

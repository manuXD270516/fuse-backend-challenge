import { Controller, Get, Query } from '@nestjs/common';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  /**
   * GET /stocks
   * Optional query param: nextToken
   * Returns a list of available stocks from the vendor API
   */
  @Get()
  async getAllStocks(@Query('nextToken') nextToken?: string) {
    try {
      const data = await this.stocksService.getStocks(nextToken);
      return data;
    } catch (error) {
      return {
        statusCode: error.response?.status || 500,
        message: 'Failed to fetch stocks',
        details: error.message,
      };
    }
  }
}

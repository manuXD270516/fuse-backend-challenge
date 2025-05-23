import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { StocksService } from './stocks.service';
import { GetStocksResponseDto } from './dto/get-stocks-response.dto';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  /**
   * GET /stocks
   * Optional query param: nextToken
   * Returns a list of available stocks from the vendor API
   */
  @Get()
  @ApiOkResponse({ type: GetStocksResponseDto })
  async getAllStocks(
    @Query('nextToken') nextToken?: string,
  ): Promise<GetStocksResponseDto> {
    const result = await this.stocksService.getStocks(nextToken);
    return {
      items: result.data.items,
      nextToken: result.data.nextToken,
    };
  }
}

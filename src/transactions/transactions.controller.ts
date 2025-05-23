import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { BuyStockDto } from './dto/buy-stock.dto';

@Controller('stocks')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post(':symbol/buy')
  async buyStock(
    @Param('symbol') symbol: string,
    @Query('userId') userId: string,
    @Body() buyStockDto: BuyStockDto
  ) {
    return this.transactionsService.buyStock(
      userId,
      symbol,
      buyStockDto.price,
      buyStockDto.quantity
    );
  }
}

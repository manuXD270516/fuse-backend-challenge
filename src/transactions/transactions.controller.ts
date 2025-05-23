import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { BuyStockDto } from './dto/buy-stock.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { TransactionResultDto } from './dto/transaction-result.dto';

@Controller('stocks')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post(':symbol/buy')
  @ApiOkResponse({ type: TransactionResultDto })
  async buyStock(
    @Param('symbol') symbol: string,
    @Query('userId') userId: string,
    @Body() buyStockDto: BuyStockDto,
  ): Promise<TransactionResultDto> {
    return this.transactionsService.buyStock(
      userId,
      symbol,
      buyStockDto.price,
      buyStockDto.quantity,
    );
  }
}

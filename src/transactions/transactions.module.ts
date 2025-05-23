import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';

@Module({
  exports: [TransactionsService],
  providers: [TransactionsService],
  controllers: [TransactionsController]
})
export class TransactionsModule {}

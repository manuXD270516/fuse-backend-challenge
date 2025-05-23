import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { VendorModule } from '../vendor/vendor.module';
import { TransactionLogService } from './transaction-log/transaction-log.service';
import { PortfolioStoreService } from '../portfolio/portfolio-store/portfolio-store.service';

@Module({
  imports: [VendorModule],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    TransactionLogService,
    PortfolioStoreService,
  ],
  exports: [
    TransactionsService,
    PortfolioStoreService,
  ],
})
export class TransactionsModule {}

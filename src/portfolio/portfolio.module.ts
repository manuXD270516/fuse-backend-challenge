import { Module, forwardRef } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { TransactionsModule } from '../transactions/transactions.module';
import { PortfolioStoreService } from './portfolio-store/portfolio-store.service';

@Module({
  imports: [forwardRef(() => TransactionsModule)],
  controllers: [PortfolioController],
  providers: [PortfolioService, PortfolioStoreService],
})
export class PortfolioModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { StocksModule } from './stocks/stocks.module';
import { TransactionsModule } from './transactions/transactions.module';
import { PortfolioModule } from './portfolio/portfolio.module';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), StocksModule, TransactionsModule, PortfolioModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

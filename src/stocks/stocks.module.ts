import { Module } from '@nestjs/common';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import { VendorModule } from '../vendor/vendor.module'; 

@Module({
  imports: [VendorModule], 
  controllers: [StocksController],
  providers: [StocksService],
})
export class StocksModule {}

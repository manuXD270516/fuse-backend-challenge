import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [VendorService],
  exports: [VendorService],
})
export class VendorModule {}

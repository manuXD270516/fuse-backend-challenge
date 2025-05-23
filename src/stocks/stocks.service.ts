import { Injectable } from '@nestjs/common';
import { VendorService } from '../vendor/vendor.service';

@Injectable()
export class StocksService {
  constructor(private readonly vendorService: VendorService) {}

  async getStocks(nextToken?: string): Promise<any> {
    return this.vendorService.getStocks(nextToken);
  }
}
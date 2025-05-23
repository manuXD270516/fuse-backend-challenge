import { IsNumber, IsPositive } from 'class-validator';

export class BuyStockDto {
  @IsNumber()
  price: number;

  @IsPositive()
  quantity: number;
}

export class StockItemDto {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  lastUpdated: string;
}

export class GetStocksResponseDto {
  items: StockItemDto[];
  nextToken?: string;
}

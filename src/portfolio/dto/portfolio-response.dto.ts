export class PortfolioItemDto {
  symbol: string;
  quantity: number;
}

export class PortfolioResponseDto {
  userId: string;
  holdings: PortfolioItemDto[];
}

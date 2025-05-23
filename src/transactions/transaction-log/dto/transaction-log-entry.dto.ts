export class TransactionLogEntryDto {
  userId: string;
  symbol: string;
  requestedPrice: number;
  currentPrice: number;
  quantity: number;
  success: boolean;
  timestamp: Date;
}

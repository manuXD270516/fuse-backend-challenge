import { Injectable } from '@nestjs/common';
import { TransactionLogEntryDto } from './dto/transaction-log-entry.dto';

@Injectable()
export class TransactionLogService {
  private logs: TransactionLogEntryDto[] = [];

  log(entry: Omit<TransactionLogEntryDto, 'timestamp'>) {
    this.logs.push({
      ...entry,
      timestamp: new Date(),
    });
  }

  getLogs(): TransactionLogEntryDto[] {
    return this.logs;
  }
}

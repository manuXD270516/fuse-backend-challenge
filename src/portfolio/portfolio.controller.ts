import { Controller, Get, Param } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get(':userId')
  getUserPortfolio(@Param('userId') userId: string) {
    return this.portfolioService.getUserPortfolio(userId);
  }
}

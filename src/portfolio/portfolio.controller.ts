import { Controller, Get, Param } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { PortfolioResponseDto } from './dto/portfolio-response.dto';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get(':userId')
  @ApiOkResponse({ type: PortfolioResponseDto })
  getUserPortfolio(@Param('userId') userId: string): PortfolioResponseDto {
    const raw = this.portfolioService.getUserPortfolio(userId);
    return {
      userId,
      holdings: Object.entries(raw).map(([symbol, quantity]) => ({
        symbol,
        quantity,
      })),
    };
  }
}

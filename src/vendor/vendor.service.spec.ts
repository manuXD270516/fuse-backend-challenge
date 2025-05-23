import { VendorService } from './vendor.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('VendorService', () => {
  let service: VendorService;
  let configService: ConfigService;

  beforeEach(() => {
    configService = {
      get: jest.fn((key) => {
        if (key === 'VENDOR_API_KEY') return 'mock-key';
        if (key === 'VENDOR_BASE_URL') return 'https://mock-api.com';
      }),
    } as any;

    service = new VendorService(configService);
  });

  it('should fetch stocks from vendor', async () => {
    const mockResponse = {
      data: {
        data: {
          items: [{ symbol: 'AAPL' }],
          nextToken: 'abc',
        },
      },
    };

    mockedAxios.get.mockResolvedValueOnce(mockResponse as any);

    const result = await service.getStocks();
    expect(mockedAxios.get).toHaveBeenCalledWith('https://mock-api.com/stocks', {
      headers: { 'x-api-key': 'mock-key' },
    });
    expect(result).toEqual(mockResponse.data);
  });

  it('should return stock by symbol', async () => {
    const mockResponse = {
      data: {
        data: {
          items: [{ symbol: 'AAPL' }, { symbol: 'TSLA' }],
        },
      },
    };

    mockedAxios.get.mockResolvedValueOnce(mockResponse as any);

    const stock = await service.getStockBySymbol('TSLA');
    expect(stock).toEqual({ symbol: 'TSLA' });
  });

  it('should return null if stock not found', async () => {
    const mockResponse = {
      data: {
        data: {
          items: [{ symbol: 'AAPL' }],
        },
      },
    };

    mockedAxios.get.mockResolvedValueOnce(mockResponse as any);

    const stock = await service.getStockBySymbol('UNKNOWN');
    expect(stock).toBeNull();
  });
});

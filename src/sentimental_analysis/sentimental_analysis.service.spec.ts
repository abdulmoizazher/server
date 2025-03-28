import { Test, TestingModule } from '@nestjs/testing';
import { SentimentalAnalysisService } from './sentimental_analysis.service';

describe('SentimentalAnalysisService', () => {
  let service: SentimentalAnalysisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SentimentalAnalysisService],
    }).compile();

    service = module.get<SentimentalAnalysisService>(SentimentalAnalysisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

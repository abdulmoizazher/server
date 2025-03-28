import { Module } from '@nestjs/common';
import { SentimentalAnalysisService } from './sentimental_analysis.service';

@Module({
  providers: [SentimentalAnalysisService]
})
export class SentimentalAnalysisModule {}

import { Module } from '@nestjs/common';
import { SentimentalAnalysisService } from './sentimental_analysis.service';
import { MongooseModule } from '@nestjs/mongoose';
import { sentiment,sentimentSchema } from './schemas/sentimental_analysis.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[MongooseModule.forFeature([{name: sentiment.name, schema:sentimentSchema  }]), AuthModule],
  providers: [SentimentalAnalysisService]
})
export class SentimentalAnalysisModule {}

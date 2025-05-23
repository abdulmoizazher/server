import { Module } from '@nestjs/common';
import { RecommandationService } from './recommandation.service';
import { RecommandationController } from './recommandation.controller';
import { UserModule } from 'src/user/user.module';
import { SentimentalAnalysisModule } from 'src/sentimental_analysis/sentimental_analysis.module';

@Module({
  imports : [UserModule, SentimentalAnalysisModule],
  providers: [RecommandationService],
  controllers: [RecommandationController]
})
export class RecommandationModule {}

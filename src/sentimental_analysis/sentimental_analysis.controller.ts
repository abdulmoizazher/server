import { Controller, Get, UseGuards,Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SentimentalAnalysisService } from './sentimental_analysis.service';

@Controller('sentimental-analysis')
export class SentimentalAnalysisController {

    constructor(
        private readonly SentiSrv : SentimentalAnalysisService
    ) {}

@UseGuards(JwtAuthGuard)
  @Get('current')
  async getusersentiment(@Request() req) {
    return this.SentiSrv.get_current_sentiment(req.user.userId);
  }


}

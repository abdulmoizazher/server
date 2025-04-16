import { Controller, Get, UseGuards,Request, Post, Body } from '@nestjs/common';
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

  @Post("sentiment")
  async anaylzesenitmet(){
    return this.SentiSrv.analyzeEmotion("I'm feeling anxious today");
   }

   @UseGuards(JwtAuthGuard)
   @Post("update-sentiment")
  async update_senitmet(@Request() req ,){
    return this.SentiSrv.update_sentiment("joy", req.user.userId);
   }
}

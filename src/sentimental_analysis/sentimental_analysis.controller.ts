import { Controller, Get, UseGuards, Request, Post, Body, Patch } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SentimentalAnalysisService } from './sentimental_analysis.service';
import { update_sentimentDto } from './dtos/update_sentiment.dto';

@Controller('sentimental-analysis')
export class SentimentalAnalysisController {

  constructor(
    private readonly SentiSrv: SentimentalAnalysisService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('current')
  async getusersentiment(@Request() req) {
    return this.SentiSrv.get_current_sentiment(req.user.userId);
  }
  @UseGuards(JwtAuthGuard)
  @Post("sentiment")
  async anaylzesenitmet(@Request() req) {
    return this.SentiSrv.analyzeEmotion("I'm feeling sad today", req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("update-sentiment")
  async update_senitmet(@Request() req,@Body() update_sentimentdto:update_sentimentDto) {
    return this.SentiSrv.update_senitment_with_dto(update_sentimentdto, req.user.userId);
  }
}

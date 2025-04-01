import { Controller, Get,Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RecommandationService } from './recommandation.service';

@Controller('recommandation')
export class RecommandationController {

    constructor(
        private readonly UserRec : RecommandationService 
    ){

    }

@UseGuards(JwtAuthGuard)
@Get('current')
async user_recommandation (@Request() req):Promise <any | string>{

    const preference = await this.UserRec.get_user_recommandation(req.user.userId);
    console.log("Full preference object:", preference); // Check if keys exist
    console.log("All keys:", Object.keys(preference));
    const positiveEmotions = [
        "admiration", "amusement", "approval", "caring", "curiosity",
        "desire", "excitement", "gratitude", "joy", "love",
        "optimism", "pride", "relief"
      ];
      const negativeEmotions = [
        "anger", "annoyance", "disappointment", "disapproval", "disgust",
        "embarrassment", "fear", "grief", "nervousness", "remorse",
        "sadness", "stress", "anxiety", "depression", "suicidal"
      ];
    
      
      const neutralEmotions = [
        "confusion", "realization", "surprise", "unknown", "neutral"
      ];

      
    const sentiment = "joy";

    if(positiveEmotions.includes(sentiment)){
        return preference.mood_happy;
        
      }

    else if(negativeEmotions.includes(sentiment)){
        return preference.mood_sad;
      }

    else if(neutralEmotions.includes(sentiment)){
        return preference.mood_confused;
      }

      

}



}


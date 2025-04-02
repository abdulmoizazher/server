import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class RecommandationService {

    private readonly youtubeApiUrl: string;
    private readonly youtubeApiKey: string;

 
    
    constructor(
        private readonly userSrv: UserService,
        private readonly configService: ConfigService
        
    ) { 
        this.youtubeApiUrl = this.configService.get<string>('YOUTUBE_API_URL');
        this.youtubeApiKey = this.configService.get<string>('YOUTUBE_API_KEY');
    }


    async user_recommandation(userId: any) {



        const user_preference = await this.userSrv.get_user_preference(userId);
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

        if (positiveEmotions.includes(sentiment)) {
            return user_preference.mood_happy;

        }

        else if (negativeEmotions.includes(sentiment)) {
            return user_preference.mood_sad;
        }

        else if (neutralEmotions.includes(sentiment)) {
            return user_preference.mood_confused;
        }



    }

    async test(){
        
        const response = await axios.get(this.youtubeApiUrl, {
            params: {
              key: this.youtubeApiKey,
              q: 'joy',
              part: 'snippet',
              maxResults: 10,
              type: 'video',
            },
        });
        return response.data.items.map(video => ({
            title: video.snippet.title,
            videoId: video.id.videoId,
            thumbnail: video.snippet.thumbnails.high.url,
            channelTitle: video.snippet.channelTitle,
            publishedAt: video.snippet.publishedAt,
          }));
    }
}

import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { SentimentalAnalysisService } from 'src/sentimental_analysis/sentimental_analysis.service';

@Injectable()
export class RecommandationService {

    private readonly youtubeApiUrl: string;
    private readonly youtubeApiKey: string;
   
 
    
    constructor(
        private readonly userSrv: UserService,
        private readonly configService: ConfigService,
        private readonly sentisrv : SentimentalAnalysisService
        
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
        console.log(Object.keys(this.sentisrv));
        console.log('check')
        const sentiment = await this.sentisrv.get_current_sentiment(userId);
        console.log(sentiment)


        if (positiveEmotions.includes(sentiment)) {
            return this.fetch_videos( user_preference.mood_happy);

        }

        else if (negativeEmotions.includes(sentiment)) {
            return this.fetch_videos(user_preference.mood_sad);
        }

        else if (neutralEmotions.includes(sentiment)) {
            return  this.fetch_videos(user_preference.mood_confused);
        }



    }

    async fetch_videos(searchquery :string){
        
        const response = await axios.get(this.youtubeApiUrl, {
            params: {
              key: this.youtubeApiKey,
              q: searchquery,
              part: 'snippet',
              maxResults: 10,
              type: 'video',
              order: 'viewCount', 
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

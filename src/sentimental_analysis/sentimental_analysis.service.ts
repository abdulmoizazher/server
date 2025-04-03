import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from "axios"
import { sentiment, sentimentDocument } from './schemas/sentimental_analysis.schema';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class SentimentalAnalysisService {

  constructor(
     @InjectModel(sentiment.name) private userModel: Model<sentimentDocument>,
      private readonly authService: AuthService,
  ){

  }
    
    private fastapiurl = "http://0.0.0.0:8000/predict";


    async analyzeSentiment(text: string, emotions: Record<string, number>) {
        try {
          // Convert the emotion object to the required format
          const emotionsArray = Object.entries(emotions).map(([key, value]) => ({ [key]: value }));
    
          // Send request to FastAPI
          const response = await axios.post(this.fastapiurl, { text, emotions: emotionsArray });
    
          // Get the dominant emotion
          return response.data;
        } catch (error) {
          console.error('Error calling sentiment API:', error);
          throw new Error('Sentiment analysis failed');
        }
      }

      async get_current_sentiment (userID):Promise <string>{

        return
      }
}



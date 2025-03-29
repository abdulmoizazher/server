import { Injectable } from '@nestjs/common';
import axios from "axios"

@Injectable()
export class SentimentalAnalysisService {
    
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

}



import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from "axios"
import { sentiment, sentimentDocument } from './schemas/sentimental_analysis.schema';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { console } from 'inspector';
import { ConfigService } from '@nestjs/config';
import { update_sentimentDto } from './dtos/update_sentiment.dto';


@Injectable()
export class SentimentalAnalysisService {
  

  constructor(
    @InjectModel(sentiment.name) private sentimentModel: Model<sentimentDocument>,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {

  }

  private fastapiurl = this.configService.get<string>('SENTIMENTAL_SERVICE_URL');


  async analyzeEmotion(text: string, userID: string) {
    try {
      const response = await axios.post<{
        text: string;
        predictions: { emotion: string; probability: number }[];
      }>(this.fastapiurl, { text }, {
        headers: { 'Content-Type': 'application/json' }
      });
  
      const { text: originalText, predictions } = response.data;
  
      const dominantEmotion = predictions.reduce((prev, current) =>
        (prev.probability > current.probability) ? prev : current
      );
      

      await this.update_sentiment(dominantEmotion.emotion,userID)
      
      
      return {
        originalText,
        allEmotions: predictions,
        dominantEmotion,
        summary: `Dominant emotion is ${dominantEmotion.emotion} (${(dominantEmotion.probability * 100).toFixed(1)}%)`
      };
  
    } catch (error) {
      console.error('Analysis failed:', error.response?.data || error.message);
      throw new Error('Sentiment analysis failed');
    }
  }

 

  async get_current_sentiment(userID: string): Promise<any> {
    try {
      process.stdout.write('[1] Function entered');
      
    
      if (!userID) {
        process.stdout.write('[2] userID is empty');
        return 'Invalid user ID';
      }
   
      
           
      
      const query = { userid: userID }
      const existingrecord = await this.sentimentModel
      .findOne(query).lean() 
      
      process.stdout.write("dgsdfg"+existingrecord);
      process.stdout.write('Document fields:'+ Object.keys(existingrecord));
      if (!existingrecord) {
        process.stdout.write('[10] No record found');
        return 'user did not talk to the model today';
      }
      
      process.stdout.write('Collection name:'+ this.sentimentModel.collection.name);
      return existingrecord.sentiment;
      
    } catch (error) {
      console.error('[12] Error in get_current_sentiment:', error);
      return 'An error occurred';
    }
  }




async get_sentiment_history(userID: string): Promise<any> {
  try {
    if (!userID) {
      process.stdout.write('[2] userID is empty');
      return 'Invalid user ID';
    }
    
    
         
    
    const query = { userid: userID }
    const existingrecord = await this.sentimentModel
    .findOne(query).lean() // Note: matches exact field name in your document
    
    if (!existingrecord) {
      return 'user did not talk to the model';
    }
    
    process.stdout.write('Collection name:'+ this.sentimentModel.collection.name);
    return existingrecord.sentiment_history;
    
  } catch (error) {
    console.error('[12] Error in get_current_sentiment:', error);
    return 'An error occurred';
  }
}

  async update_sentiment(sentiment: string, userID:string){

    const query = { userid: userID }
    const existingrecord = await this.sentimentModel
    .findOne(query)
    if (existingrecord){

      const updated = await this.sentimentModel.findOneAndUpdate(
        { userid: userID },
        {
          $set: { sentiment: sentiment },
          $push: {
            sentiment_history: {
              $each: [ sentiment ],
              $slice: -7
            }
          }
        },
        { new: true } 
      );
    
    return updated;
  }
  else{
    const new_record = new this.sentimentModel;
    new_record.userid = userID
    new_record.sentiment = sentiment;
    new_record.sentiment_history.push(sentiment)
    await new_record.save()
    
    return new_record;
  }
     
  }

  async update_senitment_with_dto (update_sentimentdto:update_sentimentDto ,userID:string ){

    this.update_sentiment(update_sentimentdto.sentiment, userID)

  }

}
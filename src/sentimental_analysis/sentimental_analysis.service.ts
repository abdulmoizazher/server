import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from "axios"
import { sentiment, sentimentDocument } from './schemas/sentimental_analysis.schema';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { console } from 'inspector';

@Injectable()
export class SentimentalAnalysisService {

  constructor(
    @InjectModel(sentiment.name) private sentimentModel: Model<sentimentDocument>,
    private readonly authService: AuthService,
  ) {

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

  async get_current_sentiment(userID: string): Promise<any> {
    try {
      process.stdout.write('[1] Function entered');
      
      // Basic validation
      if (!userID) {
        process.stdout.write('[2] userID is empty');
        return 'Invalid user ID';
      }
      process.stdout.write(userID);
      
           
      // Validate ObjectId
      const mongoose = require('mongoose');
      console.log('[6] Is valid ObjectId?', mongoose.isValidObjectId(userID));
      if (!mongoose.isValidObjectId(userID)) {
        console.log('[7] Invalid ObjectId format');
        return 'Invalid user ID format';
      }
      
      // Main query
      console.log('[8] Before findById');
      const query = { userid: userID }
      const existingrecord = await this.sentimentModel
      .findOne(query).lean() // Note: matches exact field name in your document
      
      process.stdout.write("dgsdfg"+existingrecord);
      process.stdout.write('Document fields:'+ Object.keys(existingrecord));
      if (!existingrecord) {
        console.log('[10] No record found');
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
    process.stdout.write('[1] Function entered');
    
    // Basic validation
    if (!userID) {
      process.stdout.write('[2] userID is empty');
      return 'Invalid user ID';
    }
    process.stdout.write(userID);
    
         
    // Validate ObjectId
    const mongoose = require('mongoose');
    console.log('[6] Is valid ObjectId?', mongoose.isValidObjectId(userID));
    if (!mongoose.isValidObjectId(userID)) {
      console.log('[7] Invalid ObjectId format');
      return 'Invalid user ID format';
    }
    
    // Main query
    console.log('[8] Before findById');
    const query = { userid: userID }
    const existingrecord = await this.sentimentModel
    .findOne(query).lean() // Note: matches exact field name in your document
    
    process.stdout.write("dgsdfg"+existingrecord);
    process.stdout.write('Document fields:'+ Object.keys(existingrecord));
    if (!existingrecord) {
      console.log('[10] No record found');
      return 'user did not talk to the model today';
    }
    
    process.stdout.write('Collection name:'+ this.sentimentModel.collection.name);
    return existingrecord.sentiment_history;
    
  } catch (error) {
    console.error('[12] Error in get_current_sentiment:', error);
    return 'An error occurred';
  }
}
 

}
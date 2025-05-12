import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { SentimentalAnalysisService } from 'src/sentimental_analysis/sentimental_analysis.service';
import { Message } from './schemas/message.schema';
import { InjectModel } from '@nestjs/mongoose';
import { privateDecrypt } from 'crypto';
import { GeminiService } from 'src/gemini/gemini.service';
import { Chat } from './schemas/chat.schema';

@Injectable()
export class ChatbotService {

    constructor(
        @InjectModel(Message.name) private messageModel: Model<Message>,
        @InjectModel(Chat.name) private chatModel: Model<Chat>,
        private readonly senitsrv : SentimentalAnalysisService,
        private readonly geminiService : GeminiService    ){

    }
    async processUserMessage(chatId: string, text: string , userid : string){

        const sentiment = await this.senitsrv.analyzeEmotion(text , userid);

        // Store user message
        await this.messageModel.create({
          chatId,
          sender: 'user',
          text,
          
        });

        const history = await this.messageModel.find({ chatId }).sort({ timestamp: -1 }).limit(10).lean();
        history.reverse();

        const reply = await this.geminiService.generateReply(text, history, sentiment.allEmotions,sentiment.dominantEmotion);

        // Store AI reply
        await this.messageModel.create({
          chatId,
          sender: 'senticare_ai',
          text: reply,
        });
    
        return reply;
      }

      async createChat(userId: string, title: string): Promise<Chat> {
        return this.chatModel.create({ userId, title });
      }
    
      async getUserChats(userId: string): Promise<Chat[]> {
        return this.chatModel.find({ userId }).sort({ updatedAt: -1 }).lean();
      }
    
      async getChatMessages(chatId) {
        console.log(chatId)
        return this.messageModel.find({ chatId}).sort({ createdAt: 1 }).lean();
      }
    
    }


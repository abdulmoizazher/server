import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { Message, MessageSchema } from './schemas/message.schema';
import { AuthModule } from 'src/auth/auth.module';
import { sentiment } from 'src/sentimental_analysis/schemas/sentimental_analysis.schema';
import { SentimentalAnalysisModule } from 'src/sentimental_analysis/sentimental_analysis.module';
import { GeminiService } from 'src/gemini/gemini.service';
import { GeminiModule } from 'src/gemini/gemini.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
    AuthModule,
    SentimentalAnalysisModule,
    GeminiModule
    
  ],
  providers: [ChatbotService],
  controllers: [ChatbotController]
})
export class ChatbotModule {}

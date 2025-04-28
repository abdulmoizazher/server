import { Controller, Post, Body, UseGuards,Request, Get, Param } from '@nestjs/common';
import { SendMessageDto } from './dtos/chat.dtos';
import { ApiOperation } from '@nestjs/swagger';
import { ChatbotService } from './chatbot.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { create_chat_dto } from './dtos/create_chat.dtos';

@Controller('chatbot')
export class ChatbotController {

    constructor(

        private readonly chatsrv: ChatbotService
    ) { }


    @UseGuards(JwtAuthGuard)
    @Post('message')  // Removed `:chatId` from the route
    @ApiOperation({ summary: " api to send text message and return reply " })
    async handleMessage( @Request() req , @Body() dto: SendMessageDto )  {
        const reply = await this.chatsrv.processUserMessage(dto.chatId, dto.text, req.user.userId );
        return { reply };
    }
    
    @UseGuards(JwtAuthGuard)
    @Get(':userId')
    @ApiOperation({ summary: " api to get message of a user" })
    async getUserChats(@Request() req) {
      return this.chatsrv.getUserChats(req.user.userId);
    }
  
    @Get(':chatId/messages')
    @ApiOperation({ summary: "return all the messages of user and senti in the a particluar chat" })
    async getMessages(@Param('chatId') chatId: string) {
      return this.chatsrv.getChatMessages(chatId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: "create a chat" })
    @Post('create')
    async createChat(@Body() dto : create_chat_dto, @Request() req ) {
      return this.chatsrv.createChat(req.user.userId, dto.title);
    }
}

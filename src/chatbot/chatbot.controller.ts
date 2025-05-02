import { Controller, Post, Body, UseGuards,Request, Get, Param } from '@nestjs/common';
import { SendMessageDto } from './dtos/chat.dtos';
import { ApiOperation } from '@nestjs/swagger';
import { ChatbotService } from './chatbot.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { create_chat_dto } from './dtos/create_chat.dtos';
import { get_chat_dto } from './dtos/get_chat.dto';

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
    @Get('all')
    @ApiOperation({ summary: " api to get chats of a user" })
    async getUserChats(@Request() req) {
      return this.chatsrv.getUserChats(req.user.userId);
    }
  
    @Get('messages')
    @ApiOperation({ summary: "return all the messages of user and senti in the a particluar chat" })
    async getMessages(@Body() dto : get_chat_dto) {
      return this.chatsrv.getChatMessages(dto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: "create a chat" })
    @Post('create')
    async createChat(@Body() dto : create_chat_dto, @Request() req ) {
      return this.chatsrv.createChat(req.user.userId, dto.title);
    }
}

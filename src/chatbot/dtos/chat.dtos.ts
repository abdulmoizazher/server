// send-message.dto.ts
import { IsString } from 'class-validator';

export class SendMessageDto {
  @IsString()
  chatId: string;  // Now part of the body, not URL

  @IsString()
  text: string;


}
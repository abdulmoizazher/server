// send-message.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendMessageDto {
  @ApiProperty({description: "chatid"})
  @IsString()
  chatId: string;  // Now part of the body, not URL

  @ApiProperty({description: "text"})
  @IsString()
  text: string;


}
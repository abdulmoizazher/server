import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export  class get_chat_dto {

    @ApiProperty({description: "chatid"})
    @IsString()
    chatid:  string;
}
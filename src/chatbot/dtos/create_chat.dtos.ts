import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export  class create_chat_dto {

    
    @ApiProperty({description: "title"})
    @IsString()
    title: string;
}
import { IsString } from "class-validator";


export  class create_chat_dto {

    
     
    @IsString()
    title: string;
}
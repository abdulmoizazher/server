import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class update_sentimentDto{
  

    
    @ApiProperty({ description: 'sentiment of user' })
    @IsString()
    sentiment: string;

}

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail,IsString } from "class-validator";

export class  GetUserDto{
  

    
      @ApiProperty({ description: 'User password' })
      @IsString()
      userid: string;

}

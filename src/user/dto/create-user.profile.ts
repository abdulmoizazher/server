import { ApiProperty } from "@nestjs/swagger";
import { IsString,IsDate } from "class-validator";

export class CreateUserprofile {
  

    @ApiProperty({ description: 'date fo birth' })
    @IsDate()
    DOB: Date;
    

    @ApiProperty({ description: 'location' })
    @IsString()
    location: string;


    @ApiProperty({ description: 'sex of user' })
    @IsString()
    gender: string;

}

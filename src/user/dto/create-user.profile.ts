import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserprofile {
  


    @ApiProperty({ description: 'nickname of user' })
    @IsString()
    name: string;


    @ApiProperty({ description: 'date fo birth' })
    @IsString()
    DOB: string;
    

    @ApiProperty({ description: 'location' })
    @IsString()
    location: string;


    @ApiProperty({ description: 'sex of user' })
    @IsString()
    gender: string;

}

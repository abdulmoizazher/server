import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsObject, IsString } from "class-validator";


class preferences {
    
    
    @ApiProperty({ description: 'when the mood is happy'})
    @IsString()
    mood_happy : string;


    @ApiProperty({ description: 'when the mood is sad'})
    @IsString()
    mood_sad : string;

    @ApiProperty({ description: 'when the mood is neutral'})
    @IsString()
    mood_confused : string;

    @ApiProperty({ description: 'prefer shorts or not'})
    @IsBoolean()
    like_shorts : boolean;
}

export class set_user_preferencesDto{

    @IsObject()
    Preferences : preferences
}
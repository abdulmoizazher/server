import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFeedbackDto {
  
  @IsString()
  @IsNotEmpty()
  feedback: string;
}

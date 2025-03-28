import { IsString, IsNotEmpty, IsOptional, IsArray, IsUrl, IsNumber } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  title: string; // Title of the self-help resource

  @IsString()
  @IsNotEmpty()
  content: string; // Full content of the resource

  @IsString()
  @IsNotEmpty()
  category: string; // Category (e.g., Anxiety, Depression)

  @IsOptional()
  @IsString()
  author?: string; // Author name (optional)

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[]; // Keywords for search

  @IsOptional()
  @IsUrl()
  source?: string; // Reference link (if any)

  
  
  @IsOptional()
  @IsNumber()
  likes?: number; // Number of likes (default: 0)

  @IsOptional()
  @IsNumber()
  views?: number; // Number of views (default: 0)

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  relatedResources?: string[]; // Related resource IDs
}

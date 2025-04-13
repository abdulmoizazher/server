import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray, IsUrl, IsNumber } from 'class-validator';

export class CreateResourceDto {
  @ApiProperty({
    description: 'Title of the self-help resource',
    example: 'Coping with Anxiety Attacks',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Full content of the self-help resource',
    example: 'Anxiety attacks can be overwhelming. Here are some techniques to manage them...',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'Category of the resource (e.g., Anxiety, Depression)',
    example: 'Anxiety',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiPropertyOptional({
    description: 'Name of the author (optional)',
    example: 'Dr. Jane Doe',
  })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiPropertyOptional({
    description: 'List of tags for search and filtering',
    example: ['mindfulness', 'relaxation', 'stress'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({
    description: 'Reference or source URL for the content (optional)',
    example: 'https://www.mentalhealth.org/resources/anxiety-guide',
  })
  @IsOptional()
  @IsUrl()
  source?: string;

  @ApiPropertyOptional({
    description: 'Number of likes the resource has received (default: 0)',
    example: 15,
  })
  @IsOptional()
  @IsNumber()
  likes?: number;

  @ApiPropertyOptional({
    description: 'Number of times the resource has been viewed (default: 0)',
    example: 120,
  })
  @IsOptional()
  @IsNumber()
  views?: number;

  @ApiPropertyOptional({
    description: 'IDs of related resources for recommendations or navigation',
    example: ['abc123', 'xyz789'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  relatedResources?: string[];
}

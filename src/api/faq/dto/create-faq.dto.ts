import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFaqDto {
  @ApiProperty({ description: 'Question for the FAQ', example: 'What is your return policy?' })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({ description: 'Answer for the FAQ', example: 'Our return policy lasts 30 days.' })
  @IsString()
  @IsNotEmpty()
  answer: string;
}

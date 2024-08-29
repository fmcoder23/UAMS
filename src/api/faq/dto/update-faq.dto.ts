import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFaqDto } from './create-faq.dto';

export class UpdateFaqDto extends PartialType(CreateFaqDto) {
  @ApiProperty({ description: 'Question for the FAQ', example: 'What is your return policy?' })
  question?: string;

  @ApiProperty({ description: 'Answer for the FAQ', example: 'Our return policy lasts 30 days.' })
  answer?: string;
}

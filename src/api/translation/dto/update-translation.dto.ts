import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { TranslationStatus } from '@prisma/client';
import { CreateTranslationDto } from './create-translation.dto';
import { Type } from 'class-transformer';

export class UpdateTranslationDto extends PartialType(CreateTranslationDto) {
  @ApiProperty({ description: 'ID of the user requesting the translation', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851', required: false })
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ApiProperty({ description: 'Expected date for the translation', example: '2024-12-01T00:00:00Z', required: false })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  expectedDate?: Date;

  @ApiProperty({ description: 'Additional comments for the translation', example: 'Please expedite this translation.', required: false })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty({ description: 'Status of the translation', enum: TranslationStatus, example: TranslationStatus.PENDING, required: false })
  @IsEnum(TranslationStatus)
  @IsOptional()
  status?: TranslationStatus;
}

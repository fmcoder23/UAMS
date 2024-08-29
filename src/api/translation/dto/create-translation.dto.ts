import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { TranslationStatus } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateTranslationDto {
  @ApiProperty({ description: 'ID of the user requesting the translation', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Expected date for the translation', example: '2024-12-01T00:00:00Z' })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  expectedDate: Date;

  @ApiProperty({ description: 'Additional comments for the translation', example: 'Please expedite this translation.' })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty({ description: 'Status of the translation', enum: TranslationStatus, example: TranslationStatus.PENDING })
  @IsEnum(TranslationStatus)
  @IsNotEmpty()
  status: TranslationStatus;
}

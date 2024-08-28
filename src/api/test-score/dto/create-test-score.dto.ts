import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, IsDecimal, IsDate } from 'class-validator';
import { TestType } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateTestScoreDto {
  @ApiProperty({ description: 'Test type', enum: TestType, example: TestType.IELTS })
  @IsEnum(TestType)
  @IsNotEmpty()
  type: TestType;

  @ApiProperty({ description: 'Test score', example: 7.5 })
  @IsDecimal()
  @IsNotEmpty()
  score: number;

  @ApiProperty({ description: 'Date the test was submitted', example: '2024-01-01T00:00:00Z' })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  submitDate: Date;

  @ApiProperty({ description: 'Upload URL for the test score', example: 'http://example.com/upload.jpg' })
  @IsString()
  @IsNotEmpty()
  upload: string;

  @ApiProperty({ description: 'User ID associated with the test score', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Visa ID associated with the test score (optional)', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851', required: false })
  @IsUUID()
  @IsOptional()
  visaId?: string;
}

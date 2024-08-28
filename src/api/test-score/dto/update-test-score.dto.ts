import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsDecimal, IsDate, IsUUID } from 'class-validator';
import { TestType } from '@prisma/client';
import { Type } from 'class-transformer';

export class UpdateTestScoreDto {
  @ApiProperty({ description: 'Test type', enum: TestType, example: TestType.IELTS, required: false })
  @IsEnum(TestType)
  @IsOptional()
  type?: TestType;

  @ApiProperty({ description: 'Test score', example: 7.5, required: false })
  @IsDecimal()
  @IsOptional()
  score?: number;

  @ApiProperty({ description: 'Date the test was submitted', example: '2024-01-01T00:00:00Z', required: false })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  submitDate?: Date;

  @ApiProperty({ description: 'Upload URL for the test score', example: 'http://example.com/upload.jpg', required: false })
  @IsString()
  @IsOptional()
  upload?: string;

  @ApiProperty({ description: 'Visa ID associated with the test score (optional)', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851', required: false })
  @IsUUID()
  @IsOptional()
  visaId?: string;
}

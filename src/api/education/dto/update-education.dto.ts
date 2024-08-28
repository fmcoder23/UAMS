import { IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateEducationDto } from './create-education.dto';

export class UpdateEducationDto {
  @ApiPropertyOptional({ description: 'School name', example: 'Harvard University' })
  @IsString()
  @IsOptional()
  schoolName?: string;

  @ApiPropertyOptional({ description: 'Entry date', example: '2015-09-01', required: false })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  entryDate?: Date;

  @ApiPropertyOptional({ description: 'Graduation date', example: '2019-06-01', required: false })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  graduationDate?: Date;
}

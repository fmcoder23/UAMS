import { IsString, IsOptional, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEducationDto {
  @ApiProperty({ description: 'School name', example: 'Harvard University' })
  @IsString()
  @IsNotEmpty()
  schoolName: string;

  @ApiProperty({ description: 'Entry date', example: '2015-09-01', required: false })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  entryDate?: Date;

  @ApiProperty({ description: 'Graduation date', example: '2019-06-01', required: false })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  graduationDate?: Date;
}

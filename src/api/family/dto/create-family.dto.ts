import { IsString, IsOptional, IsDate, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFamilyDto {
  @ApiProperty({ description: 'First name of the father (optional)', example: 'John', required: false })
  @IsString()
  @IsOptional()
  fatherFirstName?: string;

  @ApiProperty({ description: 'Last name of the father (optional)', example: 'Doe', required: false })
  @IsString()
  @IsOptional()
  fatherLastName?: string;

  @ApiProperty({ description: 'Birth date of the father (optional)', example: '1960-01-01', required: false })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  fatherBirthDate?: Date;

  @ApiProperty({ description: 'Passport number of the father (optional)', example: 'A1234567', required: false })
  @IsString()
  @IsOptional()
  fatherPassportNumber?: string;

  @ApiProperty({ description: 'Phone number of the father (optional)', example: '+998901234567', required: false })
  @IsString()
  @IsOptional()
  fatherPhone?: string;

  @ApiProperty({ description: 'Occupation of the father (optional)', example: 'Engineer', required: false })
  @IsString()
  @IsOptional()
  fatherOccupation?: string;

  @ApiProperty({ description: 'First name of the mother (optional)', example: 'Jane', required: false })
  @IsString()
  @IsOptional()
  motherFirstName?: string;

  @ApiProperty({ description: 'Last name of the mother (optional)', example: 'Doe', required: false })
  @IsString()
  @IsOptional()
  motherLastName?: string;

  @ApiProperty({ description: 'Birth date of the mother (optional)', example: '1965-01-01', required: false })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  motherBirthDate?: Date;

  @ApiProperty({ description: 'Passport number of the mother (optional)', example: 'B1234567', required: false })
  @IsString()
  @IsOptional()
  motherPassportNumber?: string;

  @ApiProperty({ description: 'Phone number of the mother (optional)', example: '+998901234568', required: false })
  @IsString()
  @IsOptional()
  motherPhone?: string;

  @ApiProperty({ description: 'Occupation of the mother (optional)', example: 'Teacher', required: false })
  @IsString()
  @IsOptional()
  motherOccupation?: string;
}

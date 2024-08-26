import { IsString, IsOptional, IsDate, IsNotEmpty, IsUUID, IsPhoneNumber, IsEnum, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';

export class CreateProfileDto {
  @ApiProperty({ description: 'First name of the user', example: 'John' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  firstName: string;

  @ApiProperty({ description: 'Middle name of the user (optional)', example: 'Michael', required: false })
  @IsString()
  @IsOptional()
  @Length(1, 50)
  middleName?: string;

  @ApiProperty({ description: 'Last name of the user', example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  lastName: string;

  @ApiProperty({ description: 'Birthdate of the user', example: '1990-01-01' })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty({ description: 'Region where the user resides', example: 'Tashkent' })
  @IsString()
  @IsNotEmpty()
  region: string;

  @ApiProperty({ description: 'Passport number of the user', example: 'A1234567' })
  @IsString()
  @IsNotEmpty()
  @Length(9, 9)
  passportNumber: string;

  @ApiProperty({ description: 'Date when the passport was issued', example: '2015-01-01' })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  passportGivenDate: Date;

  @ApiProperty({ description: 'Date when the passport expires', example: '2025-01-01' })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  passportEndDate: Date;

  @ApiProperty({ description: 'URL of the user’s photo (optional)', example: 'http://example.com/photo.jpg', required: false })
  @IsString()
  @IsOptional()
  photo?: string;

  @ApiProperty({ description: 'Primary address of the user (optional)', example: '123 Main St' })
  @IsString()
  @IsNotEmpty()
  address1: string;

  @ApiProperty({ description: 'Secondary address of the user (optional)', example: 'Apt 4B', required: false })
  @IsString()
  @IsOptional()
  address2?: string;

  @ApiProperty({ description: 'Phone number of the user (optional)', example: '+998901234567' })
  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'Gender of the user', enum: Gender, example: Gender.MALE })
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @ApiProperty({ description: 'ID of the country associated with the user', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  @IsUUID()
  @IsNotEmpty()
  countryId: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber, IsJSON, IsObject } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ description: 'Title of the contact', example: 'Main Office' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Address of the contact', example: '123 Main St, City, Country' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Email address of the contact', example: 'contact@example.com' })
  @IsEmail()
  @IsNotEmpty()
  mail: string;

  @ApiProperty({ description: 'Phone number of the contact', example: '+998901234567' })
  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'Location of the contact in JSON format', example: '{"lat": 41.3773, "lng": 64.5853}' })
  @IsObject()
  @IsNotEmpty()
  location: any;
}

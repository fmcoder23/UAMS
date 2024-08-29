import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAboutDto {
  @ApiProperty({ description: 'Photo URL of the about section', example: 'http://example.com/photo.jpg' })
  @IsString()
  @IsNotEmpty()
  photo: string;

  @ApiProperty({ description: 'Title of the about section', example: 'About Us' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Description of the about section', example: 'This is the about us section description.' })
  @IsString()
  @IsNotEmpty()
  description: string;
}

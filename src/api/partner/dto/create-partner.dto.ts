import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreatePartnerDto {
  @ApiProperty({ description: 'URL of the partner logo', example: 'http://example.com/logo.png' })
  @IsString()
  @IsNotEmpty()
  logo: string;

  @ApiProperty({ description: 'Website URL of the partner', example: 'http://example.com' })
  @IsUrl()
  @IsNotEmpty()
  websiteUrl: string;
}

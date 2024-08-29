import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePartnerDto } from './create-partner.dto';

export class UpdatePartnerDto extends PartialType(CreatePartnerDto) {
  @ApiProperty({ description: 'URL of the partner logo', example: 'http://example.com/logo.png', required: false })
  logo?: string;

  @ApiProperty({ description: 'Website URL of the partner', example: 'http://example.com', required: false })
  websiteUrl?: string;
}

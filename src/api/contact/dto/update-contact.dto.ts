import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateContactDto } from './create-contact.dto';

export class UpdateContactDto extends PartialType(CreateContactDto) {
  @ApiProperty({ description: 'Title of the contact', example: 'Main Office', required: false })
  title?: string;

  @ApiProperty({ description: 'Address of the contact', example: '123 Main St, City, Country', required: false })
  address?: string;

  @ApiProperty({ description: 'Email address of the contact', example: 'contact@example.com', required: false })
  mail?: string;

  @ApiProperty({ description: 'Phone number of the contact', example: '+998901234567', required: false })
  phone?: string;

  @ApiProperty({ description: 'Location of the contact in JSON format', example: '{"lat": 41.3773, "lng": 64.5853}', required: false })
  location?: any;
}

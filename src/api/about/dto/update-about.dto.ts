import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAboutDto } from './create-about.dto';

export class UpdateAboutDto extends PartialType(CreateAboutDto) {
  @ApiProperty({ description: 'Photo URL of the about section', example: 'http://example.com/photo.jpg' })
  photo?: string;

  @ApiProperty({ description: 'Title of the about section', example: 'About Us' })
  title?: string;

  @ApiProperty({ description: 'Description of the about section', example: 'This is the about us section description.' })
  description?: string;
}

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUniversityDto } from './create-university.dto';

export class UpdateUniversityDto extends PartialType(CreateUniversityDto) {
  @ApiProperty({ example: 'University Name', required: false })
  name?: string;

  @ApiProperty({ example: 'University Short Name', required: false })
  shortName?: string;

  @ApiProperty({ example: 'Long Description about the university', required: false })
  longDescription?: string;

  @ApiProperty({ example: 'Short Description about the university', required: false })
  shortDescription?: string;

  @ApiProperty({ example: 'University Address', required: false })
  address?: string;

  @ApiProperty({ example: 'University Website', required: false })
  websiteUrl?: string;

  @ApiProperty({ example: 'Country ID', required: false })
  countryId?: string;

  @ApiProperty({ example: ['photo1.png', 'photo2.png'], required: false })
  photos?: string[];
}

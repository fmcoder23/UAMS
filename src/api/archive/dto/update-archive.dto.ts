import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateArchiveDto } from './create-archive.dto';

export class UpdateArchiveDto extends PartialType(CreateArchiveDto) {
  @ApiProperty({ description: 'Reason for archiving (optional)', example: 'Updated reason for archiving', required: false })
  @IsString()
  @IsOptional()
  reason?: string;
}

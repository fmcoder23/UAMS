import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateVisaDto } from './create-visa.dto';
import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class UpdateVisaDto extends PartialType(CreateVisaDto) {
  @ApiProperty({ description: 'Updated University ID', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851', required: false })
  @IsUUID()
  @IsOptional()
  universityId?: string;

  @ApiProperty({ description: 'Updated Acceptance Letter', example: 'letter.pdf', required: false })
  @IsString()
  @IsOptional()
  acceptanceLetter?: string;
}

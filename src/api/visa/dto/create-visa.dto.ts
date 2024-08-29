import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class CreateVisaDto {
  @ApiProperty({ description: 'User ID', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'University ID', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  @IsUUID()
  @IsNotEmpty()
  universityId: string;

  @ApiProperty({ description: 'Acceptance Letter', example: 'letter.pdf' })
  @IsString()
  @IsNotEmpty()
  acceptanceLetter: string;
}

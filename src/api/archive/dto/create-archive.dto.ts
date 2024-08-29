import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateArchiveDto {
  @ApiProperty({ description: 'ID of the user being archived', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Reason for archiving', example: 'User requested deletion' })
  @IsString()
  @IsNotEmpty()
  reason: string;
}

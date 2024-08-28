import { IsString, IsOptional, IsUUID, IsEnum, IsInt, Min, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentStatus, PaymentMethod } from '@prisma/client';

export class UpdateContractDto {
  @ApiPropertyOptional({ description: 'User ID', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({ description: 'Price of the contract', example: 1000 })
  @IsInt()
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ description: 'Amount paid', example: 500 })
  @IsInt()
  @Min(0)
  @IsOptional()
  paid?: number;

  @ApiPropertyOptional({ description: 'Amount of debt', example: 500 })
  @IsInt()
  @Min(0)
  @IsOptional()
  debt?: number;

  @ApiPropertyOptional({ description: 'Payment status', enum: PaymentStatus, example: PaymentStatus.UNPAID })
  @IsEnum(PaymentStatus)
  @IsOptional()
  paymentStatus?: PaymentStatus;

  @ApiPropertyOptional({ description: 'Payment method', enum: PaymentMethod, example: PaymentMethod.CARD })
  @IsEnum(PaymentMethod)
  @IsOptional()
  paymentMethod?: PaymentMethod;

  @ApiPropertyOptional({ description: 'Upload file URL', example: 'http://example.com/file.pdf' })
  @IsString()
  @IsOptional()
  upload?: string;

  @ApiPropertyOptional({ description: 'Contract ID prefix', example: 'B23-F' })
  @IsString()
  @Length(5, 5)
  @IsOptional()
  contractIdPrefix?: string;
}

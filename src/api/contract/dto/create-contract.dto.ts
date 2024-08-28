import { IsString, IsNotEmpty, IsUUID, IsEnum, IsInt, Min, Max, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus, PaymentMethod } from '@prisma/client';

export class CreateContractDto {
  @ApiProperty({ description: 'User ID', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Price of the contract', example: 1000 })
  @IsInt()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Amount paid', example: 500 })
  @IsInt()
  @Min(0)
  paid: number;

  @ApiProperty({ description: 'Amount of debt', example: 500 })
  @IsInt()
  @Min(0)
  debt: number;

  @ApiProperty({ description: 'Payment status', enum: PaymentStatus, example: PaymentStatus.UNPAID })
  @IsEnum(PaymentStatus)
  @IsNotEmpty()
  paymentStatus: PaymentStatus;

  @ApiProperty({ description: 'Payment method', enum: PaymentMethod, example: PaymentMethod.CARD })
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;

  @ApiProperty({ description: 'Upload file URL', example: 'http://example.com/file.pdf' })
  @IsString()
  @IsNotEmpty()
  upload: string;

  @ApiProperty({ description: 'Contract ID prefix', example: 'B23-F' })
  @IsString()
  @Length(5, 5)
  @IsNotEmpty()
  contractIdPrefix: string; // Admin enters this part
}
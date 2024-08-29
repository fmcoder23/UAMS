import { ApiProperty } from "@nestjs/swagger";
import { AppStatus, PaymentStatus } from "@prisma/client";
import { IsUUID, IsNotEmpty, IsEnum, IsBoolean, IsInt, Min } from "class-validator";

export class CreateApplicationDto {
    @ApiProperty({ description: 'UUID of the user applying', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({ description: 'UUID of the university', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
    @IsUUID()
    @IsNotEmpty()
    universityId: string;

    @ApiProperty({ description: 'UUID of the program', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
    @IsUUID()
    @IsNotEmpty()
    programId: string;

    @ApiProperty({ description: 'Whether an interview is required', example: false })
    @IsBoolean()
    @IsNotEmpty()
    isInterview: boolean;

    @ApiProperty({ description: 'Payment amount for the application', example: 1000 })
    @IsInt()
    @Min(0)
    paymentAmount: number;

    @ApiProperty({ description: 'Payment status', enum: PaymentStatus, example: PaymentStatus.UNPAID })
    @IsEnum(PaymentStatus)
    @IsNotEmpty()
    paymentStatus: PaymentStatus;
}
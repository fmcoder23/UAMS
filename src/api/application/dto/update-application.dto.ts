import { ApiProperty } from "@nestjs/swagger";
import { AppStatus, PaymentStatus } from "@prisma/client";
import { IsEnum, IsOptional, IsBoolean, IsInt, Min } from "class-validator";

export class UpdateApplicationDto {
    @ApiProperty({ description: 'Application status', enum: AppStatus, example: AppStatus.IN_REVIEW })
    @IsEnum({
        "APPLIED": AppStatus.APPLIED,
        "IN_REVIEW": AppStatus.IN_REVIEW,
        "ACCEPTED": AppStatus.ACCEPTED,
        "WAITLISTED": AppStatus.WAITLISTED,
        "REJECTED": AppStatus.REJECTED
    })
    @IsOptional()
    appStatus?: AppStatus;

    @ApiProperty({ description: 'Whether an interview is required', example: false })
    @IsBoolean()
    @IsOptional()
    isInterview?: boolean;

    @ApiProperty({ description: 'Payment amount for the application', example: 1000 })
    @IsInt()
    @Min(0)
    @IsOptional()
    paymentAmount?: number;

    @ApiProperty({ description: 'Payment status', enum: PaymentStatus, example: PaymentStatus.UNPAID })
    @IsEnum(PaymentStatus)
    @IsOptional()
    paymentStatus?: PaymentStatus;
}
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @ApiProperty({ example: "John Doe" })
    fullname: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: "john@gmail.com" })
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @ApiProperty({ example: "12345" })
    password: string;

    @IsNotEmpty()
    @IsEnum({"USER": Role.USER, "ADMIN": Role.ADMIN, "SUPERADMIN": Role.SUPERADMIN})
    @ApiProperty({ enum: [Role.ADMIN, Role.USER, Role.SUPERADMIN], example: "USER" })
    role: Role;

}

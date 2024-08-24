import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateProgramDto {

    @ApiProperty({example: "Computer Science"})
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.trim())
    name: string;

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.trim())
    @ApiProperty({example: "Some description"})
    description: string;
    
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({example: "University ID"})
    @Transform(({ value }) => value.trim())
    universityId: string;

}

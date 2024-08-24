import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateUniversityDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: "University Name" })
    @Transform(({ value }) => value.trim())
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "Long Description about the university" })
    @Transform(({ value }) => value.trim())
    longDescription: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "Short Description about the university" })
    @Transform(({ value }) => value.trim())
    shortDescription: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "University Address" })
    @Transform(({ value }) => value.trim())
    address: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: "University Website" })
    @Transform(({ value }) => value.trim())
    websiteUrl: string;

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({ example: "Country ID" })
    @Transform(({ value }) => value.trim())
    countryId: string;

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({ example: `["photo1.png", "photo2.png"]` })
    photos: string[];

}

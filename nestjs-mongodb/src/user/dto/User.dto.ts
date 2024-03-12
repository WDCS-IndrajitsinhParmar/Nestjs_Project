import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { SettingsDto } from "./Settings.dto";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username:string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email:string;

    @IsNumber()
    @IsOptional()
    age:number

    @IsOptional()
    @ValidateNested()
    settings:SettingsDto
}
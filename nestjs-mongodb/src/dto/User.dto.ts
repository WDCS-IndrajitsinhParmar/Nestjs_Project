import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username:string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email:string;

    @IsNumber()
    age?:number
}
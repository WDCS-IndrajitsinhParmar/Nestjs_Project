import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class PostDto{

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    title:string

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    content:string

    @IsNotEmpty()
    @IsString()
    userId:string
}
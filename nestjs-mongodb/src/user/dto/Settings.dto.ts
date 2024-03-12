import { IsBoolean } from "class-validator";

export class SettingsDto{
    
    @IsBoolean()
    notification?:boolean

    @IsBoolean()
    email?:boolean

    @IsBoolean()
    sms?:boolean
}
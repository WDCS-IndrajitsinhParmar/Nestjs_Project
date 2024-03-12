import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class UserSettings{
    @Prop({required:false})
    notification?:boolean

    @Prop({required:false})
    email?:boolean

    @Prop({required:false})
    sms?:boolean
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings)
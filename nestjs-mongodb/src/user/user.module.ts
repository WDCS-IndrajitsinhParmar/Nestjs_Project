import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserServices } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schema/User.schema";
import { UserSettings, UserSettingsSchema } from "./schema/Settings.schema";

@Module({
    imports:[MongooseModule.forFeature([
        {
            name:User.name,
            schema:UserSchema
        },
        {
            name:UserSettings.name,
            schema:UserSettingsSchema
        }
    ])],
    controllers:[UserController],
    providers:[UserServices]
})

export class UserModule{}
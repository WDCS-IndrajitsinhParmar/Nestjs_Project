import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserServices } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schema/User.schema";

@Module({
    imports:[MongooseModule.forFeature([
        {
            name:User.name,
            schema:UserSchema
        }
    ])],
    controllers:[UserController],
    providers:[UserServices]
})

export class UserModule{}
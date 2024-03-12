import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserSettings } from "./Settings.schema";
import { UserPosts } from "src/post/schema/Post.schema";

@Schema()
export class User{
    @Prop({required:true})
    username:string;

    @Prop({unique:true, required:true})
    email:string;

    @Prop({required:true})
    age:number;

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'UserSettings'})
    settings?:UserSettings

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'UserPosts'}]})
    posts?:UserPosts[]
}

export const UserSchema = SchemaFactory.createForClass(User) 
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/user/schema/User.schema";

@Schema()
export class UserPosts{
    @Prop({required:true})
    title:string

    @Prop({required:true})
    content:string

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:"User"})
    user:User
}

export const UserPostsSchema = SchemaFactory.createForClass(UserPosts)
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserPosts, UserPostsSchema } from "./schema/Post.schema";
import { User, UserSchema } from "src/user/schema/User.schema";
import { postcontroller } from "./post.contrller";
import { postServices } from "./post.service";

@Module({
    imports:[MongooseModule.forFeature([
        {
            name:UserPosts.name,
            schema:UserPostsSchema
        },
        {
            name:User.name,
            schema:UserSchema
        }
    ])],
    controllers:[postcontroller],
    providers:[postServices]
})

export class PostModule {}
import { BadRequestException, ForbiddenException, HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserPosts } from "./schema/Post.schema";
import mongoose, { Model } from "mongoose";
import { User } from "src/user/schema/User.schema";
import { PostDto } from "./dto/Post.dto";

@Injectable()
export class postServices{
    constructor(
        @InjectModel(UserPosts.name) private postModel:Model<UserPosts>,
        @InjectModel(User.name) private userModel:Model<User>,
    ){}

    async createPost({userId,...createPost}:PostDto){
        const validId = mongoose.Types.ObjectId.isValid(userId);
        if(!validId) throw new BadRequestException("Invalid request")
        const findUser = await this.userModel.findById(userId);
        if(!findUser) throw new HttpException("User not found",404)
        const newPost = new this.postModel({
            ...createPost,
            user:userId
        })
        const savedPost = await newPost.save()
        await findUser.updateOne({
            $push:{
                posts:savedPost._id
            }
        })
        return savedPost 
    }
}
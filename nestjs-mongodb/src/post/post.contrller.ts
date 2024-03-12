import { Body, Controller, Post } from "@nestjs/common";
import { postServices } from "./post.service";
import { PostDto } from "./dto/Post.dto";

@Controller("post")
export class postcontroller{
    constructor( private readonly postServices:postServices ){}

    @Post("/create")
    createPost(@Body() body:PostDto){
        return this.postServices.createPost(body);
    }
}
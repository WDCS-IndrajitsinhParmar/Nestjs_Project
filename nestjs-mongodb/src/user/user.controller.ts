import { Body, Controller, Post, Get, Param, Patch, Delete, HttpException } from "@nestjs/common";
import { UserServices } from "./user.service";
import { CreateUserDto } from "./dto/User.dto";
import mongoose from "mongoose";

@Controller("user")
export class UserController{
    constructor(private readonly userServices:UserServices){}

    @Post('/create')
    createUser(@Body() body:CreateUserDto){
        return this.userServices.createUser(body)
    }

    @Get()
    getAll(){
        return this.userServices.getALL()
    }

    @Patch('/update/:id')
    updateUser(@Param("id") id:string, @Body() body:CreateUserDto){
        const validId = mongoose.Types.ObjectId.isValid(id)
        if(!validId) throw new HttpException("User not found",404)
        return this.userServices.updateUser(id,body)
    }

    @Get(":id")
    getById(@Param("id") id:string){
        const validId = mongoose.Types.ObjectId.isValid(id)
        if(!validId) throw new HttpException("User not found",404)
        return this.userServices.findUserById(id)
    }

    @Delete(":id")
    delete(@Param("id") id:string){
        const validId = mongoose.Types.ObjectId.isValid(id)
        if(!validId) throw new HttpException("User not found",404)
        return this.userServices.deleteUser(id)
    }
}
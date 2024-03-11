import { Body, Controller, Post, Get, Param, Patch, Delete } from "@nestjs/common";
import { UserServices } from "./user.service";
import { CreateUserDto } from "src/dto/User.dto";

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
        return this.userServices.updateUser(id,body)
    }

    @Get(":id")
    getById(@Param("id") id:string){
        return this.userServices.findUserById(id)
    }

    @Delete(":id")
    delete(@Param("id") id:string){
        return this.userServices.deleteUser(id)
    }
}
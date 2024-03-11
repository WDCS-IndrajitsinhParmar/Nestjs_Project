import { ConflictException, HttpException, HttpStatus, Injectable, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, mongo } from "mongoose";
import { CreateUserDto } from "src/dto/User.dto";
import { User } from "src/schema/User.schema";

@Injectable()
export class UserServices{

    constructor(
        @InjectModel(User.name) private userModel:Model<User>
    ) {}

    async createUser(createUser:CreateUserDto){
        try {
            const newUser = new this.userModel(createUser);
            await newUser.save()
            return "user created successfully"
        } catch (error) {
           throw new HttpException({
                statusCode:HttpStatus.CONFLICT,
                error:"Email already exist"
            },HttpStatus.CONFLICT);
        }
    }

    async getALL(){
        return await this.userModel.find()
    }

    async updateUser(id:string, updateUser:CreateUserDto){
        try {
            const user = await this.userModel.findByIdAndUpdate(id,updateUser,{new:true})   
        if(!user){
            throw new HttpException({
                statusCode:HttpStatus.NOT_FOUND,
                error:"User not found"
            },HttpStatus.NOT_FOUND);
          }
        return "User updated successfully"
        } catch (error) {
            throw new HttpException({
                statusCode:HttpStatus.NOT_FOUND,
                error:"User not found"
            },HttpStatus.NOT_FOUND);
        }
    }

    async findUserById(id:string){
        try {
            const user = await this.userModel.findById(id) 
            if(!user){
                throw new HttpException({
                    statusCode:HttpStatus.NOT_FOUND,
                    error:"User not found"
                },HttpStatus.NOT_FOUND);
                }
            return user
        }catch (error) {
            throw new HttpException({
                statusCode:HttpStatus.NOT_FOUND,
                error:"User not found"
            },HttpStatus.NOT_FOUND);
        }
    }

    async deleteUser(id:string){
        try {
            const user = await this.userModel.findByIdAndDelete(id)
            console.log(user,"user")
            if(!user){
                throw new HttpException({
                    statusCode:HttpStatus.NOT_FOUND,
                    error:"User not found"
                },HttpStatus.NOT_FOUND);
                }
            return "User deleted successfully"
        }catch (error) {
            throw new HttpException({
                statusCode:HttpStatus.NOT_FOUND,
                error:"User not found"
            },HttpStatus.NOT_FOUND);
        }
    }
}

import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model} from "mongoose";
import { CreateUserDto } from "./dto/User.dto";
import { UserSettings } from "./schema/Settings.schema";
import { User } from "./schema/User.schema";

@Injectable()
export class UserServices{

    constructor(
        @InjectModel(User.name) private userModel:Model<User>,
        @InjectModel(UserSettings.name) private settingsModel:Model<UserSettings>
    ) {}

    async createUser({settings,...createUser}:CreateUserDto){
        try {
            if(settings){
                const newSettings = new this.settingsModel(settings)
                const savedsettings = await newSettings.save();
                const newUser = new this.userModel({
                    ...createUser,
                    settings:savedsettings._id
                })
                await newUser.save()
                return "user created successfully"
            }
            const newUser = new this.userModel(createUser);
            await newUser.save();
            return "user created successfully"
        } catch (error) {
            if(error.code === 11000){
                throw new HttpException("Email already exist",409);
            }else{
                console.log(error)
                throw new HttpException("Internal server error",500);
            }
        }
    }

    async getALL(){
        return await this.userModel.find().populate(['settings','posts'])
    }

    async updateUser(id:string, updateUser:CreateUserDto){
        const user = await this.userModel.findByIdAndUpdate(id,updateUser,{new:true})   
        if(!user) throw new HttpException("User not found",404)
        return "User updated successfully"
    }

    async findUserById(id:string){
        const user = await this.userModel.findById(id).populate(['settings','posts']) 
        if(!user) throw new HttpException("User not found",404)
        return user
    }

    async deleteUser(id:string){
        const user = await this.userModel.findByIdAndDelete(id)
        if(!user) throw new HttpException("User not found",404)
        return "User deleted successfully" 
    }
}

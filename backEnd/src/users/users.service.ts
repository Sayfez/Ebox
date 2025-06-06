import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Iuser } from './Interface/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  
  constructor(@InjectModel('users') private UserModel: Model<Iuser>) {}
  async CreateUser(createUserDto: CreateUserDto): Promise<Iuser> {
    const newUser = await new this.UserModel(createUserDto);
    return newUser.save();
  }

  async getAllUser(): Promise<Iuser[]> {
    const existingUser = await this.UserModel.find().exec();
    if (!existingUser) {
      throw new NotFoundException(`User not found`);
    }
    return existingUser;
  }

  async getUser(IdUser: string): Promise<Iuser> {
    const existingUser = await this.UserModel.findById(IdUser).exec();
    return existingUser;
  }
///
async getUserByEmail(Email: string): Promise<Iuser> {
  const existingUser = await this.UserModel.findOne({Email}).exec();
  return existingUser;
}
///

  async updateUser(IdUser: string, updateUserDto: UpdateUserDto): Promise<Iuser> {
    const existingUser = await this.UserModel.findByIdAndUpdate(IdUser, updateUserDto, { new: true});
    return existingUser;
  }

  async deleteUser(IdUser: string): Promise<Iuser> {
    const deleteUser = await this.UserModel.findByIdAndDelete(IdUser);
    if (!deleteUser) {
      throw new Error(`User with IdUser ${IdUser} not found`);
    }
    return deleteUser;
  }

  async checkUserRole(role: string): Promise<Iuser[]> {
    const usersByRole = await this.UserModel.find({ role }).exec();
    if (!usersByRole) {
      throw new NotFoundException(`Users with role ${role} not found`);
    }
    return usersByRole;
  }
}

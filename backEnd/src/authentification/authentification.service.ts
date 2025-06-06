import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from "argon2";
import { User } from 'src/users/entities/user.entity';
import { Iuser } from 'src/users/Interface/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class AuthentificationService {
  constructor(/*@InjectModel(User.name) private readonly userModel: Model<Iuser>,............................*/ 
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ){}
  
async signUp(createUserDto:CreateUserDto): Promise<any> {
  const userExists = await this.usersService.getUserByEmail(
    createUserDto.Email,
  );
  if (userExists){
    throw new BadRequestException('Email already exists');
  }
  const newUser = await this.usersService.CreateUser(createUserDto);
  const tokens = await this.getTokens(newUser.id, newUser.Email);
  await this.updateRefreshToken(newUser._id, tokens.refreshToken);
  return{tokens,newUser};
}
async signIn(data:CreateLoginDto) {
const user = await this.usersService.getUserByEmail(data.Email);
if(!user) throw new BadRequestException('Email does not exist');
const passwordMatches = await argon2.verify(user.Password, data.Password);
if(!passwordMatches)
  throw new BadRequestException('Incorrect Password');
const tokens = await this.getTokens(user._id, user.Email);
await this.updateRefreshToken(user._id, tokens.refreshToken);
return {tokens,user};
}
async logout(IdUser:string){
  this.usersService.updateUser(IdUser,{refreshToken: null});
}
async refreshTokens(IdUser:string,refreshToken:string){
  const user = await this.usersService.getUser(IdUser);
  if(!user || !user.refreshToken)
    throw new ForbiddenException('access Denied');
  const refreshTokenMatches = await argon2.verify(
    user.refreshToken,
    refreshToken,
  );
  if(!refreshTokenMatches) throw new ForbiddenException('Access Denied');
  const tokens = await this.getTokens(user.id,user.Email);
  await this.updateRefreshToken(user.id, tokens.refreshToken);
  return tokens;
}
hashData(data: string){
  return argon2.hash(data);
}
async updateRefreshToken(IdUser:string, refreshToken:string){
  const hashedRefreshToken = await this.hashData(refreshToken);
  await this.usersService.updateUser(IdUser,{
    refreshToken:hashedRefreshToken,
  });
}
async getTokens(IdUser:string,Email: string){
  const [accessToken,refreshToken]= await Promise.all([
    this.jwtService.signAsync(
      {
        sub:IdUser,
        Email,
      },
      {
        secret:"backend",
        expiresIn: '15m',
      },
    ),
    this.jwtService.signAsync(
      {
        sub:IdUser,
        Email,
      },
      {
        secret:"backend",
        expiresIn: '7d',
      },
    ),
  ]);
  return {
    accessToken,
    refreshToken,
  };
}
/*
async getUsersByRole(role: string): Promise<User[]> {
  const users = await this.userModel.find({ role }).exec();
  if (!users) {
    throw new NotFoundException(`No users found with role ${role}`);
  }
  return users;
}......................................................................*/
}

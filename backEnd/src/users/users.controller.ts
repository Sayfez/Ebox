import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(  //photo**********************************************
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./upload/users",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto,@UploadedFile()file) {
    try {
      createUserDto.Photo=file.filename
       const newUser = await this.usersService.CreateUser(createUserDto);
      return response.status(HttpStatus.CREATED).json({
      message:'User has been created successfully',
      status: HttpStatus.CREATED,
      data: newUser
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: User not created!' + err,
        data: null
      });
    }
  }

  @Get()
  async getUsers(@Res() response) {
    try {
      const UserData = await this.usersService.getAllUser();
      return response.status(HttpStatus.OK).json({
        message: 'All Users data found',
        status: HttpStatus.OK,
        data: UserData,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }
/*
@Get('/users/:Email')
async getUserByEmail(@Res() response, @Param('Email') Email: string){
  try {
    const existingUser = await this.usersService.getUser(Email);
  return response.status(HttpStatus.OK).json({
    message: 'User Found',
    status: HttpStatus.OK,
    data : existingUser
  });
  } catch (err) {
  return response.status(err.status).json({
    message: err.response,
    status: HttpStatus.BAD_REQUEST,
    data: null
  });
}
}
*/
  @Get('/:id')
  async getUser(@Res() response, @Param('id') IdUser: string) {
    try {
      const existingUser = await this.usersService.getUser(IdUser);
    return response.status(HttpStatus.OK).json({
      message: 'User Found',
      status: HttpStatus.OK,
      data : existingUser
    });
    } catch (err) {
    return response.status(err.status).json({
      message: err.response,
      status: HttpStatus.BAD_REQUEST,
      data: null
    });
  }
}
  @Put('/:id')
  async updateUser(@Res() response, @Param('id') IdUser: string, @Body() updateUserDto: UpdateUserDto) {
    try{
      const existingUser = await this.usersService.updateUser(IdUser,updateUserDto);
    return response.status(HttpStatus.OK).json({
      message: 'User has been successfully updated',
      data: existingUser,
      status: HttpStatus.OK
    });
    } catch (err) {
    return response.status(err.status).json({
      message: err.response,
      status: HttpStatus.BAD_REQUEST,
      data: null
    });
    }
 }
  @Delete('/:id')
  async deleteUser(@Res() response, @Param('id') IdUser: string) {
    try{
    const deleteUser = await this.usersService.deleteUser(IdUser);
    return response.status(HttpStatus.OK).json({
    message: 'User successfully deleted',
    status: HttpStatus.OK,
    data: deleteUser
    });
  } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      message: err.response,
      status: HttpStatus.BAD_REQUEST,
      data: null
    });
  }}

  /////////////////////////
  
}

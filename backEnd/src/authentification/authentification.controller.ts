import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import {CreateLoginDto } from './dto/login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AccessTokenGuard } from './guards/accessToken.guards';
import { RefreshTokenGuard } from './guards/refreshToken.guards';
import { RolesGuard } from './guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Request } from 'express';


@Controller('authentification')
@UseGuards(RolesGuard)  // Apply RolesGuard to the entire controller
export class AuthentificationController {
  constructor(private readonly authentificationService: AuthentificationService) {}

  @Post('/signup')
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./upload/users",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  signup(@Body() CreateUserDto: CreateUserDto,@UploadedFile()file) {
    CreateUserDto.Photo=file.filename
    return this.authentificationService.signUp(CreateUserDto);
  }

  @Post('/signin')
  signin(@Body() data: CreateLoginDto) {
    return this.authentificationService.signIn(data);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authentificationService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  RefreshTokens(@Req() req: Request) {
    const IdUser = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authentificationService.refreshTokens(IdUser, refreshToken);
  }
  /*
  @UseGuards(AccessTokenGuard)
  @Get('userByRole/:role')
  async getUsersByRole(@Param('role') role: string) {
    return this.authentificationService.getUsersByRole(role);
  } */
  @UseGuards(AccessTokenGuard)
  @Roles('admin')
  @Get('adminOnly')
  getAdminData() {
    return 'This is admin only data';
  }

  @UseGuards(AccessTokenGuard)
  @Roles('enseignant')
  @Get('enseignantOnly')
  getEnseignantData() {
    return 'This is enseignant only data';
  }

  @UseGuards(AccessTokenGuard)
  @Roles('etudiant')
  @Get('etudiantOnly')
  getEtudiantData() {
    return 'This is etudiant only data';
  }
}

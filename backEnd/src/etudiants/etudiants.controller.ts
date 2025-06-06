import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EtudiantsService } from './etudiants.service';
import { CreateEtudiantDto } from './dto/create-etudiant.dto';
import { UpdateEtudiantDto } from './dto/update-etudiant.dto';
import { SchemaFactory } from '@nestjs/mongoose';
import { Etudiant } from './entities/etudiant.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { response } from 'express';

@Controller('etudiants')
export class EtudiantsController {
  constructor(private readonly etudiantsService: EtudiantsService) {}

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
  async createEtudiant(@Res() response, @Body() createEtudiantDto: CreateEtudiantDto,@UploadedFile()file) {
    try {
      createEtudiantDto.Photo=file.filename
      const newEtudiant = await this.etudiantsService.CreateEtudiant(createEtudiantDto);
      return response.status(HttpStatus.CREATED).json({
      message:'Etudiant has been created successfully',
      status: HttpStatus.CREATED,
      data: newEtudiant
      }); 
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Etudiant not created!' + err,
        data: null
      });
    }
  }

  @Get()
  async getEtudiants(@Res() response) {
    try {
      const EtudiantData = await this.etudiantsService.getAllEtudiant();
      return response.status(HttpStatus.OK).json({
        message: 'All Etudiants data found',
        status: HttpStatus.OK,
        data: EtudiantData,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }

  @Get('/:id')
  async getEtudiant(@Res() response, @Param('id') IdEtudiant: string) {
    try {
      const existingEtudiant = await this.etudiantsService.getEtudiant(IdEtudiant);
    return response.status(HttpStatus.OK).json({
      message: 'Etudiant Found',
      status: HttpStatus.OK,
      data : existingEtudiant
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
  async updateEtudiant(@Res() response, @Param('id') IdEtudiant: string, @Body() updateEtudiantDto: UpdateEtudiantDto) {
    try{
      const existingEtudiant = await this.etudiantsService.updateEtudiant(IdEtudiant,updateEtudiantDto);
    return response.status(HttpStatus.OK).json({
      message: 'Etudiant has been successfully updated',
      data: existingEtudiant,
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
  async deleteEtudiant(@Res() response, @Param('id') IdEtudiant: string) {
    try{
    const deleteEtudiant = await this.etudiantsService.deleteEtudiant(IdEtudiant);
    return response.status(HttpStatus.OK).json({
    message: 'Etudiant successfully deleted',
    status: HttpStatus.OK,
    data: deleteEtudiant
    });
  } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      message: err.response,
      status: HttpStatus.BAD_REQUEST,
      data: null
    });
  }}
  
  @Get('getetudiants/:id')
  async getEtudiantByClass(@Res() response, @Param('id') IdClasse: string ){
    try {
      const existingEtudiant = await this.etudiantsService.getEtudiantByClass(IdClasse);
      console.log(IdClasse)
      console.log("existingEtudiant",existingEtudiant)
      return response.status(HttpStatus.OK).json({
        message: 'Students data found',
        status: HttpStatus.OK,
        data: existingEtudiant,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  } 
  /*   @Get('getetudiants/:id')
    async getEtudiantByClass(@Res() response, @Param('id') IdClasse: string) {
      try {
        const studentsWithPresences = await this.etudiantsService.getEtudiantByClassWithPresences(IdClasse);
        return response.status(HttpStatus.OK).json({
          message: 'Students data found',
          status: HttpStatus.OK,
          data: studentsWithPresences,
        });
      } catch (err) {
        return response.status(err.status).json({
          message: err.response,
          status: HttpStatus.BAD_REQUEST,
          data: null,
        });
      }
    } */
}


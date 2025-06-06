import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EnseignantsService } from './enseignants.service';
import { CreateEnseignantDto } from './dto/create-enseignant.dto';
import { UpdateEnseignantDto } from './dto/update-enseignant.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('enseignants')
export class EnseignantsController {
  constructor(private readonly enseignantsService: EnseignantsService) {}

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
  async createEnseignant(@Res() response, @Body() createEnseignantDto: CreateEnseignantDto,@UploadedFile()file) {
    try {
      createEnseignantDto.Photo=file.filename
      const newEnseignant = await this.enseignantsService.CreateEnseignant(createEnseignantDto);
      return response.status(HttpStatus.CREATED).json({
      message:'Enseignant has been created successfully',
      status: HttpStatus.CREATED,
      data: newEnseignant
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Enseignant not created!' + err,
        data: null
      });
    }
  }

  @Get()
  async getEnseignants(@Res() response) {
    try {
      const EnseignantData = await this.enseignantsService.getAllEnseignant();
      return response.status(HttpStatus.OK).json({
        message: 'All Enseignants data found',
        status: HttpStatus.OK,
        data: EnseignantData,
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
  async getEnseignant(@Res() response, @Param('id') IdEnseignant: string) {
    try {
      const existingEnseignant = await this.enseignantsService.getEnseignant(IdEnseignant);
    return response.status(HttpStatus.OK).json({
      message: 'Enseignant Found',
      status: HttpStatus.OK,
      data : existingEnseignant
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
async updateEnseignant(@Res() response, @Param('id') IdEnseignant: string, @Body() updateEnseignantDto: UpdateEnseignantDto) {
  try{
    const existingEnseignant = await this.enseignantsService.updateEnseignant(IdEnseignant,updateEnseignantDto);
  return response.status(HttpStatus.OK).json({
    message: 'Enseignant has been successfully updated',
    data: existingEnseignant,
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
async deleteEnseignant(@Res() response, @Param('id') IdEnseignant: string) {
  try{
  const deleteEnseignant = await this.enseignantsService.deleteEnseignant(IdEnseignant);
  return response.status(HttpStatus.OK).json({
  message: 'Enseignant successfully deleted',
  status: HttpStatus.OK,
  data: deleteEnseignant
  });
} catch (err) {
  return response.status(HttpStatus.BAD_REQUEST).json({
    message: err.response,
    status: HttpStatus.BAD_REQUEST,
    data: null
  });
}}
}

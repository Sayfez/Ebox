import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, Put } from '@nestjs/common';
import { ClasseService } from './classe.service';
import { CreateClasseDto } from './dto/create-classe.dto';
import { UpdateClasseDto } from './dto/update-classe.dto';

@Controller('Classe')
export class ClasseController {
  constructor(private readonly classeService: ClasseService) {}

  @Post()
  async createClasse(@Res() response, @Body() createClasseDto: CreateClasseDto) {
    try {
      const newClasse = await this.classeService.CreateClasse(createClasseDto);
      return response.status(HttpStatus.CREATED).json({
      message:'Classe has been created successfully',
      status: HttpStatus.CREATED,
      data: newClasse
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Classe not created!' + err,
        data: null
      });
    }
  }

  @Get()
  async getClasse(@Res() response) {
    try {
      const ClasseData = await this.classeService.getAllClasse();
      return response.status(HttpStatus.OK).json({
        message: 'All Classe data found',
        status: HttpStatus.OK,
        data: ClasseData,
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
  async getClasseById(@Res() response, @Param('id') IdClasse: string) {
    try {
      const existingClasse = await this.classeService.getClasse(IdClasse);
    return response.status(HttpStatus.OK).json({
      message: 'Classe Found',
      status: HttpStatus.OK,
      data : existingClasse
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
  async updateClasse(@Res() response, @Param('id') IdClasse: string, @Body() updateClasseDto: UpdateClasseDto) {
    try{
      const existingClasse = await this.classeService.updateClasse(IdClasse,updateClasseDto);
    return response.status(HttpStatus.OK).json({
      message: 'Classe has been successfully updated',
      data: existingClasse,
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
  async deleteClasse(@Res() response, @Param('id') IdClasse: string) {
    try{
    const deleteClasse = await this.classeService.deleteClasse(IdClasse);
    return response.status(HttpStatus.OK).json({
    message: 'Classe successfully deleted',
    status: HttpStatus.OK,
    data: deleteClasse
    });
  } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      message: err.response,
      status: HttpStatus.BAD_REQUEST,
      data: null
    });
  }}
}

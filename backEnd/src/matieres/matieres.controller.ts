import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put, Catch } from '@nestjs/common';
import { MatieresService } from './matieres.service';
import { CreateMatiereDto } from './dto/create-matiere.dto';
import { UpdateMatiereDto } from './dto/update-matiere.dto';
import { response } from 'express';

@Controller('matieres')
export class MatieresController {
  constructor(private readonly matieresService: MatieresService) {}
  
  @Post()
  async createMatiere(@Res() response, @Body() createMatiereDto: CreateMatiereDto) { 
    try {
      const newMatiere = await this.matieresService.CreateMatiere(createMatiereDto);
      return response.status(HttpStatus.CREATED).json({
      message:'Matiere has been created successfully',
      status: HttpStatus.CREATED,
      data: newMatiere
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Matiere not created!' + err,
        data: null
      });
    }
  }

  @Get()
  async getMatieres(@Res() response) {
    try {
      const MatiereData = await this.matieresService.getAllMatiere();
      return response.status(HttpStatus.OK).json({
        message: 'All Matieres data found',
        status: HttpStatus.OK,
        data: MatiereData,
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
  async getMatiere(@Res() response, @Param('id') IdMatiere: string) {
    try {
      const existingMatiere = await this.matieresService.getMatiere(IdMatiere);
    return response.status(HttpStatus.OK).json({
      message: 'Matiere Found',
      status: HttpStatus.OK,
      data : existingMatiere
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
  async updateMatiere(@Res() response, @Param('id') IdMatiere: string, @Body() updateMatiereDto: UpdateMatiereDto) {
    try{
      const existingMatiere = await this.matieresService.updateMatiere(IdMatiere,updateMatiereDto);
    return response.status(HttpStatus.OK).json({
      message: 'Matiere has been successfully updated',
      data: existingMatiere,
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
  async deleteMatiere(@Res() response, @Param('id') IdMatiere: string) {
    try{
    const deleteMatiere = await this.matieresService.deleteMatiere(IdMatiere);
    return response.status(HttpStatus.OK).json({
    message: 'Matiere successfully deleted',
    status: HttpStatus.OK,
    data: deleteMatiere
    });
  } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      message: err.response,
      status: HttpStatus.BAD_REQUEST,
      data: null
    });
  }}
}

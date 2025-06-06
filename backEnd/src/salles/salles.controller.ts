import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, Put } from '@nestjs/common';
import { SallesService } from './salles.service';
import { CreateSalleDto } from './dto/create-salle.dto';
import { UpdateSalleDto } from './dto/update-salle.dto';

@Controller('salles')
export class SallesController {
  constructor(private readonly sallesService: SallesService) {}

  @Post()
  async createSalle(@Res() response, @Body() createSalleDto: CreateSalleDto) {
    try {
      const newSalle = await this.sallesService.CreateSalle(createSalleDto);
      return response.status(HttpStatus.CREATED).json({
      message:'Salle has been created successfully',
      status: HttpStatus.CREATED,
      data: newSalle
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Salle not created!' + err,
        data: null
      });
    }
  }

  @Get()
  async getAllSalle(@Res() response) {
    try {
      const SalleData = await this.sallesService.getAllSalle();
      return response.status(HttpStatus.OK).json({
        message: 'All Salles data found',
        status: HttpStatus.OK,
        data: SalleData,
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
  async getSalle(@Res() response, @Param('id') IdSalle: string) {
    try {
      const existingSalle = await this.sallesService.getSalle(IdSalle);
    return response.status(HttpStatus.OK).json({
      message: 'Salle Found',
      status: HttpStatus.OK,
      data : existingSalle
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
  async updateSalle(@Res() response, @Param('id') IdSalle: string, @Body() UpdateSalleDto: UpdateSalleDto) {
    try{
      const existingSalle = await this.sallesService.updateSallee(IdSalle,UpdateSalleDto);
    return response.status(HttpStatus.OK).json({
      message: 'Salle has been successfully updated',
      data: existingSalle,
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
  async deleteSalle(@Res() response, @Param('id') IdSalle: string) {
    try{
    const deleteSalle = await this.sallesService.deleteSalle(IdSalle);
    return response.status(HttpStatus.OK).json({
    message: 'Salle successfully deleted',
    status: HttpStatus.OK,
    data: deleteSalle
    });
  } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      message: err.response,
      status: HttpStatus.BAD_REQUEST,
      data: null
    });
  }}
}

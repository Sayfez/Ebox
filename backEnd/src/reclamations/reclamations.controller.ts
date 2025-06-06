import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { ReclamationsService } from './reclamations.service';
import { CreateReclamationDto } from './dto/create-reclamation.dto';
import { UpdateReclamationDto } from './dto/update-reclamation.dto';

@Controller('reclamations')
export class ReclamationsController {
  constructor(private readonly reclamationsService: ReclamationsService) {}

  @Post(':IdUser')
  async createReclamations(
    @Param('IdUser') IdUser: string,
    @Res() response,
    @Body() createReclamationDto: CreateReclamationDto
  ) {
    try {
      // Attach the IdUser to the DTO
      createReclamationDto.IdUser = IdUser;
      const newReclamations = await this.reclamationsService.CreateReclamations(createReclamationDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Reclamation has been created successfully',
        status: HttpStatus.CREATED,
        data: newReclamations
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Reclamation not created! ' + err,
        data: null
      });
    }
  }

  @Get()
  async getAllreclamations(@Res() response) {
    try {
      const ReclamationsData = await this.reclamationsService.getAllreclamations();
      return response.status(HttpStatus.OK).json({
        message: 'All Reclamations data found',
        status: HttpStatus.OK,
        data: ReclamationsData,
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
  async getReclamations(@Res() response, @Param('id') IdReclamation: string) {
    try {
      const existingReclamations = await this.reclamationsService.getReclamations(IdReclamation);
    return response.status(HttpStatus.OK).json({
      message: 'Reclamation Found',
      status: HttpStatus.OK,
      data : existingReclamations
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
  async updateReclamations(@Res() response, @Param('id') IdReclamation: string, @Body() updateReclamationDto: UpdateReclamationDto) {
    try{
      const existingReclamations = await this.reclamationsService.updateReclamations(IdReclamation,updateReclamationDto);
    return response.status(HttpStatus.OK).json({
      message: 'Reclamation has been successfully updated',
      data: existingReclamations,
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
  async deleteMReclamations(@Res() response, @Param('id') IdReclamation: string) {
    try{
    const deleteReclamations = await this.reclamationsService.deleteReclamations(IdReclamation);
    return response.status(HttpStatus.OK).json({
    message: 'Reclamation successfully deleted',
    status: HttpStatus.OK,
    data: deleteReclamations
    });
  } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      message: err.response,
      status: HttpStatus.BAD_REQUEST,
      data: null
    });
  }}
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { SeancesService } from './seances.service';
import { CreateSeanceDto } from './dto/create-seance.dto';
import { UpdateSeanceDto } from './dto/update-seance.dto';
import { Iseance } from './Interface/seance.interface';

@Controller('seances')
export class SeancesController {
  constructor(private readonly seancesService: SeancesService) {}



  @Post()
  async createSeance(@Res() response, @Body() createSeanceDto: CreateSeanceDto) {
    try {
      const newSeance = await this.seancesService.CreateSeance(createSeanceDto);
      return response.status(HttpStatus.CREATED).json({
      message:'Seancee has been created successfully',
      status: HttpStatus.CREATED,
      data: newSeance
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Seance not created!' + err,
        data: null
      });
    }
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
@Get('/enseignant/:IdEnseignant')
    async getSeanceByEnseignant(@Param('IdEnseignant') IdEnseignant: string){
        return this.seancesService.getSeanceByEnseignant(IdEnseignant);
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    @Get('/etudiantttt/:IdEtudiant')
    async getSeancesByEtudiant(@Param('IdEtudiant') IdEtudiant: string){
        return this.seancesService.getSeancesByEtudiant(IdEtudiant);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  @Get()
  async getSeances(@Res() response) {
    try {
      const SeanceData = await this.seancesService.getAllSeance();
      return response.status(HttpStatus.OK).json({
        message: 'All Seances data found',
        status: HttpStatus.OK,
        data: SeanceData,
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
  async getSeance(@Res() response, @Param('id') IdSeance: string) {
    try {
      const existingSeance = await this.seancesService.getSeance(IdSeance);
    return response.status(HttpStatus.OK).json({
      message: 'Seance Found',
      status: HttpStatus.OK,
      data : existingSeance
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
  async updateSeance(@Res() response, @Param('id') IdSeance: string, @Body() updateSeanceDto: UpdateSeanceDto) {
    try{
      const existingSeance = await this.seancesService.updateSeance(IdSeance,updateSeanceDto);
    return response.status(HttpStatus.OK).json({
      message: 'Seance has been successfully updated',
      data: existingSeance,
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
  async deleteSeance(@Res() response, @Param('id') IdSeance: string) {
    try{
    const deleteSeance = await this.seancesService.deleteSeance(IdSeance);
    return response.status(HttpStatus.OK).json({
    message: 'Seance successfully deleted',
    status: HttpStatus.OK,
    data: deleteSeance
    });
  } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      message: err.response,
      status: HttpStatus.BAD_REQUEST,
      data: null
    });
  }}
  ///////////////////////GET SEANCE ENSEIGNANT///// ////////////
  @Get('enseignant/:id')
  async getSeancesByEnseignant(@Param('id') id: string): Promise<Iseance[]> {
    return this.seancesService.getSeancesByEnseignant(id);
  }
}

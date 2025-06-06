import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpStatus, Res } from '@nestjs/common';
import { PresencesService } from './presences.service';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';
import { response } from 'express';
import { Ipresence } from './Interface/presence.interface';

@Controller('presences')
export class PresencesController {
  constructor(private readonly presencesService: PresencesService) { }

  @Post()
  async createPresence(@Res() response, @Body() CreatePresenceDto: CreatePresenceDto) {
    try {
      const newPresence = await this.presencesService.CreatePresence(CreatePresenceDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Presence has been created successfully',
        status: HttpStatus.CREATED,
        data: newPresence
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Presence not created!' + err,
        data: null
      });
    }
  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /*@Get('/mpercent/:IdMatiere')
  async getPresenceBySubject(@Res() response) {
    try {
      const PresenceData = await this.presencesService.getPresenceBySubject();
      return response.status(HttpStatus.OK).json({
        message: 'Percent Presences data found',
        status: HttpStatus.OK,
        data: PresenceData,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }*/
  @Get('/mpercent/:IdMatiere')
  async getPresenceBySubject(@Res() response) {
    try {
      const PresenceData = await this.presencesService.getPresenceBySubject();
      return response.status(HttpStatus.OK).json({
        message: 'Percent Presences data found',
        status: HttpStatus.OK,
        data: PresenceData,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.message,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  @Get('/cpercent/:nbrTotal')
  async getPresenceByClass(@Res() response, @Param("nbrTotal") nbrTotal: number) {
    try {
      const PresenceData = await this.presencesService.getPresenceByClass(nbrTotal);
      return response.status(HttpStatus.OK).json({
        message: 'Percent Presences data found',
        status: HttpStatus.OK,
        data: PresenceData,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  @Get('/profpercent/:IdEnseignant')
  async getPresenceByEnseignant(@Res() response, @Param("IdEnseignant") IdEnseignant: string) {
    try {
      const PresenceData = await this.presencesService.tauxPresenceByEnseignant(IdEnseignant);

      if (!PresenceData) {
        return response.status(HttpStatus.NOT_FOUND).json({
          message: 'No presence data found for this teacher',
          status: HttpStatus.NOT_FOUND,
          data: null
        });
      }

      return response.status(HttpStatus.OK).json({
        message: 'Percent Presences data found',
        status: HttpStatus.OK,
        data: PresenceData,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  @Get()
  async getPresences(@Res() response) {
    try {
      const PresenceData = await this.presencesService.getAllPresence();
      return response.status(HttpStatus.OK).json({
        message: 'All Presences data found',
        status: HttpStatus.OK,
        data: PresenceData,
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
  async getPresence(@Res() response, @Param('id') IdPresence: string) {
    try {
      const existingPresence = await this.presencesService.getPresence(IdPresence);
      return response.status(HttpStatus.OK).json({
        message: 'Presence Found',
        status: HttpStatus.OK,
        data: existingPresence
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
  async updatePresence(@Res() response, @Param('id') IdPresence: string, @Body() updatePresenceDto: UpdatePresenceDto) {
    try {
      const existingPresence = await this.presencesService.updatePresence(IdPresence, updatePresenceDto);
      return response.status(HttpStatus.OK).json({
        message: 'Presence has been successfully updated',
        data: existingPresence,
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
  async deletePresence(@Res() response, @Param('id') IdPresence: string) {
    try {
      const deletePresence = await this.presencesService.deletePresence(IdPresence);
      return response.status(HttpStatus.OK).json({
        message: 'Presence successfully deleted',
        status: HttpStatus.OK,
        data: deletePresence
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }


  @Get('/PresenceEtudiant/:IdEtudiant')
  async getPresenceByEtudiant(@Res() response, @Param('IdEtudiant') IdPresence: string) {
    try {
      const existingEtudiant = await this.presencesService.getPresenceByEtudiant(IdPresence);
      return response.status(HttpStatus.OK).json({
        message: 'Presence Found',
        status: HttpStatus.OK,
        data: existingEtudiant
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }

  }
  @Get('/updateEtat/:id')
  async updateEtat(@Res() response, @Param('id') Id: string) {
    try {
      const updatedpresence = await this.presencesService.updateEtat(Id);
      return response.status(HttpStatus.OK).json({
        message: 'Presence updated',
        status: HttpStatus.OK,
        data: updatedpresence
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }

  //////////////////////GET ALL PRESENCES BY SEANCE ID ////////////////////////////////
  @Get('/seances/:id')
  async findPresencesBySeanceId(@Param('id') id: string): Promise<Ipresence[]> {
    return this.presencesService.findPresencesBySeanceId(id);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////NOTE CC ////////////////////////////////////

  @Patch(':id/mark')
  async updateMark(@Param('id') id: string, @Body() body: { mark: number }): Promise<Ipresence> {
    return this.presencesService.updateMark(id, body.mark);
  }
  //////////////////////////MOYENNE //////////////////////////////////
  @Get('/average/:IdMatiere/:IdEtudiant')
  async getAverageMarksByMatiereAndStudent(
    @Param('IdMatiere') idMatiere: string,
    @Param('IdEtudiant') idEtudiant: string
  ): Promise<any> {
    return this.presencesService.calculateAverageMarksByMatiereAndStudent(idMatiere, idEtudiant);
  }

  @Patch(':id/noteCc')
  async updateNoteCc(
    @Param('id') id: string,
    @Body() body: {noteCc: number}
  ): Promise<any> {
    return this.presencesService.updateNoteCcAndCalculateMoyenne(id, body.noteCc);
  } 



  @Get('PresenceEtudiantss/:id')
  async checkAbsences(@Param('id') studentId: string): Promise<string> {
    // Check and send absence notification
    await this.presencesService.checkAndSendAbsenceNotification(studentId);
  
    return `Absence check ${studentId} complete and notification sent if applicable.`;
  }
}

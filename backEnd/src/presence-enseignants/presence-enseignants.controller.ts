import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { PresenceEnseignantsService } from './presence-enseignants.service';
import { CreatePresenceEnseignantDto } from './dto/create-presence-enseignant.dto';
import { UpdatePresenceEnseignantDto } from './dto/update-presence-enseignant.dto';
import { Iseance } from 'src/seances/Interface/seance.interface';

@Controller('presenceEnseignants')
export class PresenceEnseignantsController {
  constructor(private readonly presenceEnseignantsService: PresenceEnseignantsService) {}

  @Post()
  async createPresenceEnseignant(@Res() response, @Body() createPresenceEnseignantDto: CreatePresenceEnseignantDto) {
    try {
      const newPresenceEnseignant = await this.presenceEnseignantsService.CreatePresenceEnseignant(createPresenceEnseignantDto);
      return response.status(HttpStatus.CREATED).json({
      message:'Presence has been created successfully',
      status: HttpStatus.CREATED,
      data: newPresenceEnseignant
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Presence not created!' + err,
        data: null
      });
    }
  }
 //////////////////////////////////////////////////////////
 
  @Get()
  async getPresenceEnseignants(@Res() response) {
    try {
      const PresenceEnseignantData = await this.presenceEnseignantsService.getAllPresenceEnseignant();
      return response.status(HttpStatus.OK).json({
        message: 'All Presences data found',
        status: HttpStatus.OK,
        data: PresenceEnseignantData,
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
  async getPresenceEnseignant(@Res() response, @Param('id') IdPresenceEnseignant: string) {
    try {
      const existingPresenceEnseignant = await this.presenceEnseignantsService.getPresenceEnseignant(IdPresenceEnseignant);
    return response.status(HttpStatus.OK).json({
      message: 'Presence Found',
      status: HttpStatus.OK,
      data : existingPresenceEnseignant
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
  async updatePresence(@Res() response, @Param('id') IdPresenceEnseignant: string, @Body() updatePresenceEnseignantDto: UpdatePresenceEnseignantDto) {
    try{
      const existingPresenceEnseignant = await this.presenceEnseignantsService.updatePresenceEnseignant(IdPresenceEnseignant,updatePresenceEnseignantDto);
    return response.status(HttpStatus.OK).json({
      message: 'Presence has been successfully updated',
      data: existingPresenceEnseignant,
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
  async deletePresenceEnseignant(@Res() response, @Param('id') IdPresenceEnseignant: string) {
    try{
    const deletePresenceEnseignant = await this.presenceEnseignantsService.deletePresenceEnseignant(IdPresenceEnseignant);
    return response.status(HttpStatus.OK).json({
    message: 'Presence successfully deleted',
    status: HttpStatus.OK,
    data: deletePresenceEnseignant
    });
  } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      message: err.response,
      status: HttpStatus.BAD_REQUEST,
      data: null
    });
  }}
 /////////////////////////////////////
 @Get('/PresenceEnseignant/:IdEnseignant')
async getPresenceByEnseignant(@Res() response, @Param('IdEnseignant') IdPresenceEnseignant: string){  
try {
  const existingEnseignant = await this.presenceEnseignantsService.getPresenceByEnseignant(IdPresenceEnseignant);
return response.status(HttpStatus.OK).json({
  message: 'Presence Found',
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
@Get('/updateState/:id')
async updateState(@Res() response, @Param('id') Id: string){  
try {
  const updatedpresenceEnseignant= await this.presenceEnseignantsService.updateState(Id);
return response.status(HttpStatus.OK).json({
  message: 'Presence updated',
  status: HttpStatus.OK,
  data : updatedpresenceEnseignant
});
} catch (err) {
return response.status(err.status).json({
  message: err.response,
  status: HttpStatus.BAD_REQUEST,
  data: null
});
}
}
}

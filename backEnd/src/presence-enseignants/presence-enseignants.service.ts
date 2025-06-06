import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePresenceEnseignantDto } from './dto/create-presence-enseignant.dto';
import { UpdatePresenceEnseignantDto } from './dto/update-presence-enseignant.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IpresenceEnseignant } from './Ineterface/PresenceEnseignant.Interface';
import { SeancesService } from 'src/seances/seances.service';
import { Iseance } from 'src/seances/Interface/seance.interface';

@Injectable()
export class PresenceEnseignantsService {
    constructor(@InjectModel('presenceEnseignants') private PresenceEnseignantModel: Model<IpresenceEnseignant> ) {}
  async CreatePresenceEnseignant(createPresenceEnseignantDto: CreatePresenceEnseignantDto): Promise<IpresenceEnseignant> {
    const newPresence = await new this.PresenceEnseignantModel(createPresenceEnseignantDto);
    return newPresence.save();
  }

  async getAllPresenceEnseignant(): Promise<IpresenceEnseignant[]> {
    const existingPresenceEnseignant = await this.PresenceEnseignantModel.find().exec();
    if (!existingPresenceEnseignant) {
      throw new NotFoundException(`Presence not found`);
    }
    return existingPresenceEnseignant;
  }

  async getPresenceEnseignant(IdPresenceEnseignant: string): Promise<IpresenceEnseignant> {
    const existingPresenceEnseignant = await this.PresenceEnseignantModel.findById(IdPresenceEnseignant).exec();
    return existingPresenceEnseignant;
  }

  async updatePresenceEnseignant(IdPresenceEnseignant: string, updatePresenceEnseignantDto: UpdatePresenceEnseignantDto): Promise<IpresenceEnseignant> {
    const existingPresenceEnseignant = await this.PresenceEnseignantModel.findByIdAndUpdate(IdPresenceEnseignant, updatePresenceEnseignantDto, { new: true});
    return existingPresenceEnseignant;
  }

  async deletePresenceEnseignant(IdPresenceEnseignant: string): Promise<IpresenceEnseignant> {
    const deletePresenceEnseignant = await this.PresenceEnseignantModel.findByIdAndDelete(IdPresenceEnseignant);
    if (!deletePresenceEnseignant) {
      throw new Error(`Presence with IdPresence ${IdPresenceEnseignant} not found`);
    }
    return deletePresenceEnseignant;
  }
  //////////////////////////////////////////
  async getPresenceByEnseignant(IdEnseignant: string): Promise<IpresenceEnseignant[]> {
    const existingEnseignant = await this.PresenceEnseignantModel.find({IdEnseignant}).populate("IdSeance").exec();
    return existingEnseignant ;
  } 
  async updateState(id:string):Promise<IpresenceEnseignant>{
    const presenceEnseignants=await this.PresenceEnseignantModel.findById(id)
    if(presenceEnseignants.State==true){
      presenceEnseignants.State=false
      presenceEnseignants.save()
    }
    else{
      presenceEnseignants.State=true
      presenceEnseignants.save()
    }
    return presenceEnseignants
  }
}


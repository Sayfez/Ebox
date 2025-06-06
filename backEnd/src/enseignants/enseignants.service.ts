import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnseignantDto } from './dto/create-enseignant.dto';
import { UpdateEnseignantDto } from './dto/update-enseignant.dto';
import { error } from 'console';
import { InjectModel } from '@nestjs/mongoose';
import { Ienseignant } from './Interface/enseignant.Interface';
import { Model } from 'mongoose';

@Injectable()
export class EnseignantsService {
  
  constructor(@InjectModel('users') private EnseignantModel: Model<Ienseignant>) {} //
  async CreateEnseignant(createEnseignantDto: CreateEnseignantDto): Promise<Ienseignant> {
    const newEnseignant = await new this.EnseignantModel(createEnseignantDto);
    return newEnseignant.save();
  }

  async getAllEnseignant(): Promise<Ienseignant[]> {
    const existingEnseignant = await this.EnseignantModel.find({role:"enseignant"}).exec(); //heritage
    if (!existingEnseignant) {
      throw new NotFoundException(`Enseignant not found`);
    }
    return existingEnseignant;
  }

  async getEnseignant(IdEnseignant: string): Promise<Ienseignant> {
    const existingEnseignant = await this.EnseignantModel.findById(IdEnseignant).exec();
    return existingEnseignant;
  }

  async updateEnseignant(IdEnseignant: string, updateEnseignantDto: UpdateEnseignantDto): Promise<Ienseignant> {
    const existingEnseignant = await this.EnseignantModel.findByIdAndUpdate(IdEnseignant, updateEnseignantDto, { new: true});
    return existingEnseignant;
  }

  async deleteEnseignant(IdEnseignant: string): Promise<Ienseignant> {
    const deleteEnseignant = await this.EnseignantModel.findByIdAndDelete(IdEnseignant);
    if (!deleteEnseignant) {
      throw new Error(`Enseignant with IdEnseignant ${IdEnseignant} not found`);
    }
    return deleteEnseignant;
  }
}

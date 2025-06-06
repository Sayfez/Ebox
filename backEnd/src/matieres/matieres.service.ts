import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMatiereDto } from './dto/create-matiere.dto';
import { UpdateMatiereDto } from './dto/update-matiere.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Imatiere } from './Interface/matiere.interface';
import { error } from 'console';

@Injectable()
export class MatieresService {
  
  constructor(@InjectModel('matieres') private MatiereModel: Model<Imatiere>) {}
  async CreateMatiere(createMatiereDto: CreateMatiereDto): Promise<Imatiere> {
    const newMatiere = await new this.MatiereModel(createMatiereDto);
    return newMatiere.save();
  }

  async getAllMatiere(): Promise<Imatiere[]> {
    const existingMatiere = await this.MatiereModel.find().exec();
    if (!existingMatiere) {
      throw new NotFoundException(`Matiere not found`);
    }
    return existingMatiere;
  }

  async getMatiere(IdMatiere: string): Promise<Imatiere> {
    const existingMatiere = await this.MatiereModel.findById(IdMatiere).exec();
    return existingMatiere;
  }

  async updateMatiere(IdMatiere: string, updateMatiereDto: UpdateMatiereDto): Promise<Imatiere> {
    const existingMatiere = await this.MatiereModel.findByIdAndUpdate(IdMatiere, updateMatiereDto, { new: true});
    return existingMatiere;
  }

  async deleteMatiere(IdMatiere: string): Promise<Imatiere> {
    const deleteMatiere = await this.MatiereModel.findByIdAndDelete(IdMatiere);
    if (!deleteMatiere) {
      throw new Error(`Matiere with IdMatiere ${IdMatiere} not found`);
    }
    return deleteMatiere;
  }
  }

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClasseDto } from './dto/create-classe.dto';
import { UpdateClasseDto } from './dto/update-classe.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IClasse } from './Interface/Classe.Interface';
import { Model } from 'mongoose';

@Injectable()
export class ClasseService {
  constructor(@InjectModel('Classe') private ClasseModel: Model<IClasse>) {}
  async CreateClasse(createClasseDto: CreateClasseDto): Promise<IClasse> {
    const newClasse = await new this.ClasseModel(createClasseDto);
    return newClasse.save();
  }

  async getAllClasse(): Promise<IClasse[]> {
    const existingClasse = await this.ClasseModel.find().exec();
    if (!existingClasse) {
      throw new NotFoundException(`Classe not found`);
    }
    return existingClasse;
  }

  async getClasse(IdClasse: string): Promise<IClasse> {
    const existingClasse = await this.ClasseModel.findById(IdClasse).exec();
    return existingClasse;
  }

  async updateClasse(IdClasse: string, updateClasseDto: UpdateClasseDto): Promise<IClasse> {
    const existingClasse = await this.ClasseModel.findByIdAndUpdate(IdClasse, updateClasseDto, { new: true});
    return existingClasse;
  }

  async deleteClasse(IdClasse: string): Promise<IClasse> {
    const deleteClasse = await this.ClasseModel.findByIdAndDelete(IdClasse);
    if (!deleteClasse) {
      throw new Error(`Classe with IdClasse ${IdClasse} not found`);
    }
    return deleteClasse;
  }
  }


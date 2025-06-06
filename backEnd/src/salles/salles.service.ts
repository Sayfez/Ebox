import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSalleDto } from './dto/create-salle.dto';
import { UpdateSalleDto } from './dto/update-salle.dto';
import { Isalle } from './Interface/salleInterface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SallesService {
  constructor(@InjectModel('salles') private SalleModel: Model<Isalle>) {}
  async CreateSalle(createSalleDto: CreateSalleDto): Promise<Isalle> {
    const newSalle = await new this.SalleModel(createSalleDto);
    return newSalle.save();
  }

  async getAllSalle(): Promise<Isalle[]> {
    const existingSalle = await this.SalleModel.find().exec();
    if (!existingSalle) {
      throw new NotFoundException(`Sallee not found`);
    }
    return existingSalle;
  }

  async getSalle(IdSalle: string): Promise<Isalle> {
    const existingSalle = await this.SalleModel.findById(IdSalle).exec();
    return existingSalle;
  }

  async updateSallee(IdSalle: string, updateSalleDto: UpdateSalleDto): Promise<Isalle> {
    const existingSalle = await this.SalleModel.findByIdAndUpdate(IdSalle, updateSalleDto, { new: true});
    return existingSalle;
  }

  async deleteSalle(IdSalle: string): Promise<Isalle> {
    const deleteSalle = await this.SalleModel.findByIdAndDelete(IdSalle);
    if (!deleteSalle) {
      throw new Error(`Salle with IdSalle ${IdSalle} not found`);
    }
    return deleteSalle;
  }
}

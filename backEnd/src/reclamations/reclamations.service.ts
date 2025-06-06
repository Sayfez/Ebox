import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReclamationDto } from './dto/create-reclamation.dto';
import { UpdateReclamationDto } from './dto/update-reclamation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ireclamations } from './Interface/reclamations.interface';
import { UsersModule } from 'src/users/users.module';

@Injectable()
export class ReclamationsService {
  
  constructor(@InjectModel('reclamations') private reclamationsModel: Model<Ireclamations>) {}
  async CreateReclamations(createReclamationDto: CreateReclamationDto): Promise<Ireclamations> {
    const newReclamations = await new this.reclamationsModel(createReclamationDto);
 

    return newReclamations.save();
  }

  async getAllreclamations(): Promise<Ireclamations[]> {
    const existingrReclamations = await this.reclamationsModel.find().exec();
    if (!existingrReclamations) {
      throw new NotFoundException(`reclamations not found`);
    }
    return existingrReclamations;
  }

  async getReclamations(IdReclamation: string): Promise<Ireclamations> {
    const existingReclamations = await this.reclamationsModel.findById(IdReclamation).exec();
    return existingReclamations;
  }

  async updateReclamations(IdReclamation: string, updateReclamationDto: UpdateReclamationDto): Promise<Ireclamations> {
    const existingReclamations = await this.reclamationsModel.findByIdAndUpdate(IdReclamation, updateReclamationDto, { new: true});
    return existingReclamations;
  }

  async deleteReclamations(IdReclamation: string): Promise<Ireclamations> {
    const deleteReclamations = await this.reclamationsModel.findByIdAndDelete(IdReclamation);
    if (!deleteReclamations) {
      throw new Error(`Matiere with IdReclamations ${IdReclamation} not found`);
    }
    return deleteReclamations;
  }
  /////////////////////////////////////////////////////////////////////

  }


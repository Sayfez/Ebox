import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEtudiantDto } from './dto/create-etudiant.dto';
import { UpdateEtudiantDto } from './dto/update-etudiant.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ietudiant } from './Interface/etudiant.interface';

@Injectable()
export class EtudiantsService {
  
  constructor(@InjectModel('users') private EtudiantModel: Model<Ietudiant>) {} //@injectmodel ('classpere') !!!
  async CreateEtudiant(CreateEtudiantDto: CreateEtudiantDto): Promise<Ietudiant> {
    const newEtudiant = await new this.EtudiantModel(CreateEtudiantDto);
    return newEtudiant.save();
  }

  async getAllEtudiant(): Promise<Ietudiant[]> {
    const existingEtudiant = await this.EtudiantModel.find({role:"etudiant"}).exec();
    if (!existingEtudiant) {
      throw new NotFoundException(`Etudiant not found`);
    }
    return existingEtudiant;
  }

  async getEtudiant(IdEtudiant: string): Promise<Ietudiant> {
    const existingEtudiant = await this.EtudiantModel.findById(IdEtudiant).exec();
    return existingEtudiant;
  }

  async updateEtudiant(IdEtudiant: string, updateEtudiantDto: UpdateEtudiantDto): Promise<Ietudiant> {
    const existingEtudiant = await this.EtudiantModel.findByIdAndUpdate(IdEtudiant, updateEtudiantDto, { new: true});
    return existingEtudiant;
  }

  async deleteEtudiant(IdEtudiant: string): Promise<Ietudiant> {
    const deleteEtudiant = await this.EtudiantModel.findByIdAndDelete(IdEtudiant);
    if (!deleteEtudiant) {
      throw new Error(`Etudiant with IdEtudiant ${IdEtudiant} not found`);
    }
    return deleteEtudiant;
  }

  //fct
  async getEtudiantByTag(TagStudent: string): Promise<Ietudiant> {
    const existingEtudiant = await this.EtudiantModel.findOne({TagStudent}).exec();
    return existingEtudiant;
  }
  /////////////////////////////////////////////////////////////////////////
 
  async getEtudiantByClass(IdClasse: string): Promise<Ietudiant[]> {
const existingEtudiant = await this.EtudiantModel.find({IdClasse});
return existingEtudiant;
  } 
/* async getEtudiantByClassWithPresences(IdClasse: string) {
  return this.EtudiantModel.aggregate([
    { $match: { classeId: IdClasse } },
    {
      $lookup: {
        from: 'presences',
        localField: '_id',
        foreignField: 'IdEtudiant',
        as: 'presences',
      },
    },
    {
      $unwind: {
        path: '$presences',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        FamilyName: 1,
        Name: 1,
        presences: 1,
      },
    },
  ]);
} */
}

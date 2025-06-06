import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeanceDto } from './dto/create-seance.dto';
import { UpdateSeanceDto } from './dto/update-seance.dto';
import { Model } from 'mongoose';
import { Iseance } from './Interface/seance.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Isalle } from 'src/salles/Interface/salleInterface';
import { Imatiere } from 'src/matieres/Interface/matiere.interface';

@Injectable()

export class SeancesService {

  constructor(@InjectModel('seances') private SeanceModel: Model<Iseance>,@InjectModel('salles') private SalleModel: Model<Isalle>
  ,@InjectModel('matieres') private MatiereModel: Model<Imatiere>) {}
  async CreateSeance(createSeanceDto: CreateSeanceDto): Promise<Iseance> {
    const newSeance = await new this.SeanceModel(createSeanceDto);
    await this.SalleModel.findByIdAndUpdate(createSeanceDto.IdSalle,{$push:{IdSeances:newSeance}})
    return newSeance.save();
  }

  async getAllSeance(): Promise<Iseance[]> {
    const existingSeance = await this.SeanceModel.find().exec();
    if (!existingSeance) {
      throw new NotFoundException(`Seance not found`);
    }
    return existingSeance;
  }

  async getSeance(IdSeance: string): Promise<Iseance> {
    const existingSeance = await this.SeanceModel.findById(IdSeance).exec();
    return existingSeance;
  }

  async updateSeance(IdSeance: string, updateSeanceDto: UpdateSeanceDto): Promise<Iseance> {
    const existingSeance = await this.SeanceModel.findByIdAndUpdate(IdSeance, updateSeanceDto, { new: true});
    return existingSeance;
  }

  async deleteSeance(IdSeance: string): Promise<Iseance> {
    const deleteSeance = await this.SeanceModel.findByIdAndDelete(IdSeance);
    if (!deleteSeance) {
      throw new Error(`Seance with IdSeance ${IdSeance} not found`);
    }
    return deleteSeance;
  }

 
 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                            
  async getSeanceByEnseignant(IdEnseignant: string): Promise<Iseance[]> {
    try {
        // Récupérer la liste des séances pour l'enseignant donné
       return   this.SeanceModel.find({ IdEnseignant }).populate("IdSalle").populate("IdMatiere") ; 
      
        // Vérifier si des séances ont été trouvées
        /* if (ListeSeanceEnseignant.length === 0) {
            throw new Error('Aucune séance trouvée pour l\'ID de séance fourni 1111111111111111111111111111111111111.');
        } */
        
        // Retourner la liste des séances
       // return ListeSeanceEnseignant;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des séances:111111111111111 ${error.message}`);
    }
  }
//////
async getSeancesByEtudiant(IdEtudiant: string): Promise<Iseance[]> {
  return this.SeanceModel.find({ IdEtudiant }).populate("IdEtudiant").populate("IdMatiere").exec();
}
/////////////////////////////////GET ENSEIGNANT SEANCE///////////////////////////////////////////////////////////
async getSeancesByEnseignant(enseignantId: string): Promise<Iseance[]> {
  return this.SeanceModel.find({ enseignantId }).populate("IdEnseignant").populate("IdMatiere").exec();
}

}

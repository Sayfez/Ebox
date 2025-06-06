import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ipresence } from './Interface/presence.interface';
import { Console } from 'console';
import { SeancesService } from 'src/seances/seances.service';
import { Iseance } from 'src/seances/Interface/seance.interface';
import { Enseignant } from 'src/enseignants/entities/enseignant.entity';
import { Seance } from 'src/seances/entities/seance.entity';
import { Ienseignant } from 'src/enseignants/Interface/enseignant.Interface';
import { Etudiant } from 'src/etudiants/entities/etudiant.entity';
import { Iuser } from 'src/users/Interface/user.interface';
import { CreatePresenceEnseignantDto } from 'src/presence-enseignants/dto/create-presence-enseignant.dto';
import { Isalle } from 'src/salles/Interface/salleInterface';
import { IpresenceEnseignant } from 'src/presence-enseignants/Ineterface/PresenceEnseignant.Interface';
import { Ietudiant } from 'src/etudiants/Interface/etudiant.interface';
import { Logger } from '@nestjs/common';
import { Presence } from './entities/presence.entity';
import * as nodemailer from 'nodemailer';
@Injectable()
export class PresencesService {
  constructor(@InjectModel('presences') private PresenceModel: Model<Ipresence>,
    private readonly seancesService: SeancesService /* ,  @InjectModel('etudiants') private EtudiantModel: Model<Ietudiant> */,
    @InjectModel('users') private UserModel: Model<Iuser>, @InjectModel('salles') private SalleModel: Model<Isalle>, @InjectModel('seances') private SeanceModel: Model<Iseance>, @InjectModel('presenceEnseignants') private presenceEnseignantModel: Model<IpresenceEnseignant>) { }


    async CreatePresence(CreatePresenceDto: CreatePresenceDto): Promise<any> {
      // Find user by tag
      const user = await this.UserModel.findOne({ Tag: CreatePresenceDto.Data1 });
      if (!user) {
        throw new Error('Utilisateur non trouvé');
      }
      const salle = await this.SalleModel.findOne({ IdentifiantSalle: CreatePresenceDto.Data2 });
      if (!salle) {
        throw new Error('Salle non trouvée');
      }
      const Date = CreatePresenceDto.Data3.slice(0, 10);
      const Heure = CreatePresenceDto.Data3.slice(11, 16);
      const Seance = await this.SeanceModel.findOne({
        IdSalle: salle._id,
        DateSc: Date,
        HeureDebut: { $lte: Heure },
        HeureFin: { $gte: Heure },
      });
      if (!Seance) {
        throw new Error('Séance non trouvée');
      }
      if (user.role === 'enseignant') {
        const newPresenceEnseignant = new this.presenceEnseignantModel({
          State: true,
          IdEnseignant: user._id,
          IdSeance: Seance._id,
        });
        // Save the presence record
        return await newPresenceEnseignant.save();
      } else if (user.role === 'etudiant') {
        const isPresent = await this.isStudentPresent(CreatePresenceDto);
        const newPresence = new this.PresenceModel({
          Etat: isPresent,
          IdEtudiant: user._id,
          IdSeance: Seance._id,
        });
        // Save the presence record
        return await newPresence.save();
      } else {
        throw new Error('Rôle de l’utilisateur inconnu');
      }
    }
    // Function to determine if the student is present or absent
    private async isStudentPresent(CreatePresenceDto: CreatePresenceDto): Promise<boolean> {
      // Logique pour déterminer si l'étudiant est présent ou absent
      // Ici, nous retournons `false` par défaut, ce qui signifie que l'étudiant est absent.
      // Vous devez remplacer cela par votre propre logique.
      // Exemple simple : vérifier si un événement d'absence est enregistré
      const absence = await this.PresenceModel.findOne({
        TagEtudiant: CreatePresenceDto.Data1,
        Date: CreatePresenceDto.Data3.slice(0, 10),
        Heure: CreatePresenceDto.Data3.slice(11, 16),
      });
      return !absence; // Si absence est trouvé, l'étudiant est absent (return false)
    }


  async getAllPresence(): Promise<Ipresence[]> {
    const existingPresence = await this.PresenceModel.find().exec();
    if (!existingPresence) {
      throw new NotFoundException(`Presence not found`);
    }
    return existingPresence;
  }

  async getPresence(IdPresence: string): Promise<Ipresence> {
    const existingPresence = await this.PresenceModel.findById(IdPresence).exec();
    return existingPresence;
  }

  async updatePresence(IdPresence: string, updatePresenceDto: UpdatePresenceDto): Promise<Ipresence> {
    const existingPresence = await this.PresenceModel.findByIdAndUpdate(IdPresence, updatePresenceDto, { new: true });
    return existingPresence;
  }

  async deletePresence(IdPresence: string): Promise<Ipresence> {
    const deletePresence = await this.PresenceModel.findByIdAndDelete(IdPresence);
    if (!deletePresence) {
      throw new Error(`Presence with IdPresence ${IdPresence} not found`);
    }
    return deletePresence;
  }







  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
  // TAUX D'ABSENCE PAR CLASSE // 

  async getPresenceByClass(nbrTotal: number): Promise<void> {
    const ListePresence = await this.PresenceModel.find();
    const TabAbsence: { [idSeance: string]: string[] } = {}; // Utilisation d'un objet pour stocker les étudiants absents groupés par leur IdSeance
    const TabTotal: { [idSeance: string]: number } = {}; // Utilisation d'un objet pour stocker le nombre total d'étudiants par IdSeance

    // Initialiser le nombre total d'étudiants à 0 pour chaque séance
    ListePresence.forEach((absence) => {
      TabTotal[absence.IdSeance] = 0;
    });

    // Compter le nombre d'étudiants absents et le nombre total d'étudiants par séance
    for (let i = 0; i < ListePresence.length; i++) {
      const absence = ListePresence[i];
      if (!absence.Etat) { // Vérifie si l'étudiant est absent
        if (!TabAbsence[absence.IdSeance]) {
          TabAbsence[absence.IdSeance] = [];
        }
        TabAbsence[absence.IdSeance].push(absence.IdEtudiant);
        // Incrémenter le nombre total d'étudiants pour chaque séance
        TabTotal[absence.IdSeance]++;
      }
    }

    // Calculer et afficher le pourcentage d'absence pour chaque séance
    for (const idSeance in TabAbsence) {
      if (TabAbsence.hasOwnProperty(idSeance)) {
        const pourcentage = (TabAbsence[idSeance].length / nbrTotal) * 100;
        console.log(`Pourcentage d'étudiants absents pour la séance ${idSeance}: ${pourcentage.toFixed(2)}%`);
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////










  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // TAUX D'ABSENCE PAR MATIERE // 
  /*
async getPresenceBySubject(): Promise<void> {
  const ListePresence = await this.PresenceModel.find().populate('IdSeance'); // Récupérer les absences en incluant les données de séance
  const TabAbsence: { [idMatiere: string]: string[] } = {}; // Utilisation d'un objet pour stocker les absences par matière
  const TabTotal: { [idMatiere: string]: number } = {}; // Utilisation d'un objet pour stocker le nombre total d'étudiants par matière

  // Initialiser le nombre total d'étudiants et les absences pour chaque matière
  await Promise.all(ListePresence.map(async (absence) => {
    const Seance = await this.seancesService.getSeance(absence.IdSeance);
    const idMatiere = Seance.IdMatiere; // Récupérer l'ID de la matière à partir de la séance

    if (!TabTotal[idMatiere]) {
      TabTotal[idMatiere] = 0;
    }

    if (!TabAbsence[idMatiere]) {
      TabAbsence[idMatiere] = [];
    }

    TabTotal[idMatiere]++; // Incrémenter le nombre total d'étudiants pour chaque matière

    if (!absence.Etat) { // Vérifie si l'étudiant est absent
      TabAbsence[idMatiere].push(absence.IdEtudiant);
    }
  }));

  // Calculer et afficher le pourcentage d'absence pour chaque matière
  const results: { idMatiere: string, pourcentage: number }[] = [];
  for (const idMatiere in TabAbsence) {
    if (TabAbsence.hasOwnProperty(idMatiere)) {
      const pourcentage = (TabAbsence[idMatiere].length / TabTotal[idMatiere]) * 100;
      results.push({
        idMatiere,
        pourcentage: parseFloat(pourcentage.toFixed(2))
      });
      console.log(`Pourcentage d'étudiants absents pour la matière ${idMatiere}: ${pourcentage.toFixed(1)}%`);
    }
  }
  
}
  */
/*  
async getPresenceBySubject(): Promise<{ idMatiere: string, pourcentage: number }[]> {
    const ListePresence = await this.PresenceModel.find().populate('IdSeance'); // Retrieve absences including session data
    const TabAbsence: { [idMatiere: string]: string[] } = {}; // Object to store absences by subject
    const TabTotal: { [idMatiere: string]: number } = {}; // Object to store the total number of students by subject

    // Initialize the total number of students and absences for each subject
    await Promise.all(ListePresence.map(async (absence) => {
      const Seance = await this.seancesService.getSeance(absence.IdSeance);
      const idMatiere = Seance.IdMatiere; // Get the subject ID from the session

      if (!TabTotal[idMatiere]) {
        TabTotal[idMatiere] = 0;
      }

      if (!TabAbsence[idMatiere]) {
        TabAbsence[idMatiere] = [];
      }

      TabTotal[idMatiere]++; // Increment the total number of students for each subject

      if (!absence.Etat) { // Check if the student is absent
        TabAbsence[idMatiere].push(absence.IdEtudiant);
      }
    }));

    // Calculate and return the percentage of absence for each subject
    const results: { idMatiere: string, pourcentage: number }[] = [];
    for (const idMatiere in TabAbsence) {
      if (TabAbsence.hasOwnProperty(idMatiere)) {
        const pourcentage = (TabAbsence[idMatiere].length / TabTotal[idMatiere]) * 100;
        results.push({
          idMatiere,
          pourcentage: parseFloat(pourcentage.toFixed(2))
        });
        console.log(`Pourcentage d'étudiants absents pour la matière ${idMatiere}: ${pourcentage.toFixed(2)}%`);
      }
    }
    return results;
  } 
    */
  async getPresenceBySubject(): Promise<{ idMatiere: string, pourcentage: number }[]> {
    const ListePresence = await this.PresenceModel.find().populate('IdSeance');
    const TabAbsence: { [idMatiere: string]: string[] } = {};
    const TabTotal: { [idMatiere: string]: number } = {};
  
    await Promise.all(ListePresence.map(async (absence) => {
      try {
        const Seance = await this.seancesService.getSeance(absence.IdSeance);
        
        if (!Seance || !Seance.IdMatiere) {
          console.error(`Seance not found or missing IdMatiere for IdSeance: ${absence.IdSeance}`);
          return; // Skip this iteration if the session is invalid
        }
  
        const idMatiere = Seance.IdMatiere;
  
        if (!TabTotal[idMatiere]) {
          TabTotal[idMatiere] = 0;
        }
  
        if (!TabAbsence[idMatiere]) {
          TabAbsence[idMatiere] = [];
        }
  
        TabTotal[idMatiere]++;
  
        if (!absence.Etat) {
          TabAbsence[idMatiere].push(absence.IdEtudiant);
        }
      } catch (error) {
        console.error(`Error fetching Seance for IdSeance: ${absence.IdSeance}`, error);
      }
    }));
  
    const results: { idMatiere: string, pourcentage: number }[] = [];
    for (const idMatiere in TabAbsence) {
      if (TabAbsence.hasOwnProperty(idMatiere)) {
        const pourcentage = (TabAbsence[idMatiere].length / TabTotal[idMatiere]) * 100;
        results.push({
          idMatiere,
          pourcentage: parseFloat(pourcentage.toFixed(2))
        });
        console.log(`Pourcentage d'étudiants absents pour la matière ${idMatiere}: ${pourcentage.toFixed(2)}%`);
      }
    }
    return results;
  }
  

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // TAUX D'ABSENCE PAR ENSEIGNANT // 
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async tauxPresenceByEnseignant(IdEnseignant: string): Promise<number> {
    try {
      // Récupérer l'enseignant
      const enseignant: Enseignant = await this.UserModel.findById(IdEnseignant);

      // Vérifier si l'enseignant existe
      if (!enseignant) {
        throw new Error('Enseignant non trouvé.');
      }

      // Récupérer toutes les séances auxquelles l'enseignant a assisté
      const seances = await this.seancesService.getSeanceByEnseignant(IdEnseignant);

      // Initialiser le nombre total de séances et d'absences
      let totalSeances: number = 0;
      let totalAbsences: number = 0;
      let totalpresence: number = 0;
      let total: number = 0;
      // Parcourir toutes les séances
      for (const seance of seances) {
        // Incrémenter le nombre total de séances
        totalSeances++;

        // Récupérer toutes les absences pour cette séance
        const absences = await this.PresenceModel.find({ IdSeance: seance._id, Etat: false }); // Filter absences where Etat is false
        console.log(absences);
        const presences = await this.PresenceModel.find({ IdSeance: seance._id, Etat: true }); // 
        // Incrémenter le nombre total d'absences
        totalAbsences += absences.length;
        totalpresence += presences.length
        total = totalAbsences + totalpresence
      }

      // Calculer le taux d'absence
      const absenceRate: number = (total / totalSeances) * 10;
      console.log(`Pourcentage d'absence par Enseignant ${IdEnseignant}: ${absenceRate.toFixed()}%`);
      return absenceRate;
    } catch (error) {
      throw new Error(`Erreur lors du calcul du taux d'absence : ${error.message}`);
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async getPresenceByEtudiant(IdEtudiant: string): Promise<Ipresence[]> {
    const existingEtudiant = await this.PresenceModel.find({ IdEtudiant }).populate({ path: "IdSeance", populate: { path: "IdMatiere", model: "matieres" } }); 
 
    return existingEtudiant;
  }
  async updateEtat(id: string): Promise<Ipresence> {
    const presenceetudiant = await this.PresenceModel.findById(id)
    if (presenceetudiant.Etat == true) {
      presenceetudiant.Etat = false
      presenceetudiant.save()
    }
    else {
      presenceetudiant.Etat = true
      presenceetudiant.save()
    }
    return presenceetudiant
  }

  ////////////////////////GET PRESENCE BY SEANCE ////////////////
  async findPresencesBySeanceId(IdSeance: string): Promise<Ipresence[]> {
    return this.PresenceModel.find({ IdSeance }).populate({
      path: 'IdSeance', 
    })
      .populate({
        path: 'IdEtudiant',
        model: "users"
      })
      .exec();
  }
  ///////////////////////////////////////////////////////////////////////////////////////NOTE CC ////////////////////////////////////
  
  async updateMark(id: string, mark: number): Promise<Ipresence> {
    const presence = await this.PresenceModel.findById(id).exec();
    if (!presence) {
      throw new Error('Presence not found');
    }
    presence.mark = mark; // Update the mark
    return presence.save();
  }
  ////////////////////////////////////////////////////MOYENNE////////////////////////////////////////////////////////////////////////
  async calculateAverageMarksByMatiereAndStudent(IdMatiere: string, IdEtudiant: string): Promise<any> {
    console.log(`Calculating average marks for Matiere: ${IdMatiere}, Etudiant: ${IdEtudiant}`);
  
    // Fetch presences for the given Matiere and Etudiant
    const presences = await this.PresenceModel.find({
      IdMatiere: IdMatiere,
      IdEtudiant: IdEtudiant
    });
  
    // If no presences are found, return an empty array
    if (presences.length === 0) {
      return [];
    }
  
    // Initialize a structure to store the total marks and count for each seance
    const seanceMarks: { [seanceId: string]: { totalMarks: number, count: number } } = {};
  
    // Iterate over each presence and aggregate marks for each seance
    presences.forEach((presence) => {
      const seanceId = presence.IdSeance.toString(); // Convert IdSeance to string if necessary
  
      // Initialize seance entry if it doesn't exist
      if (!seanceMarks[seanceId]) {
        seanceMarks[seanceId] = { totalMarks: 0, count: 0 };
      }
  
      // Add both the mark and noteCc to the total marks
      const mark = presence.mark || 0;
      const noteCc = presence.noteCc || 0; // Assuming noteCc is the continuous assessment score
  
      // Add mark and noteCc to the total marks
      seanceMarks[seanceId].totalMarks += (mark + noteCc);
      seanceMarks[seanceId].count += 1;
    });
  
    // Calculate the average marks for each seance
    const averages = [];
  
    for (const seanceId in seanceMarks) {
      const { totalMarks, count } = seanceMarks[seanceId];
      averages.push({
        seanceId,
        averageMark: (totalMarks / count).toFixed(2) // Round to 2 decimal places
      });
    }
  
    console.log(`Calculated averages: ${JSON.stringify(averages)}`);
  
    return averages;
  }



   // Function to update noteCc and calculate Moyenne
  //  async updateNoteCcAndCalculateMoyenne(
  //   presenceId: string,
  //   noteCc: number
  // ): Promise<Presence> {
  //   // Find the presence by its ID
  //   const presence = await this.PresenceModel.findById(presenceId);
  
  //   if (!presence) {
  //     throw new Error('Presence not found');
  //   }
  
  //   // Ensure mark is treated as an array of numbers
  //   const markArray: number[] = Array.isArray(presence.mark) ? presence.mark : [];
  
  //   // Calculate the average of the marks in the array
  //   const markAverage = markArray.length > 0
  //     ? markArray.reduce((sum, current) => sum + current, 0) / markArray.length
  //     : 0;
  
  //   // Update the noteCc and calculate Moyenne (average)
  //   presence.noteCc = noteCc;
  //   presence.Moyenne = (markAverage + noteCc) / 2;
  
  //   // Save the updated presence
  //   const savedPresence = await presence.save();
  
  //   // Return the saved presence as a plain object
  //   return savedPresence.toObject() as Presence;
  // }








  async updateNoteCcAndCalculateMoyenne(
    presenceId: string,
    noteCc: number
  ): Promise<Presence> {
    console.log('Received noteCc:', noteCc);
  
    // Validate noteCc
    if (typeof noteCc !== 'number' || isNaN(noteCc) || noteCc < 0) {
      throw new Error('Invalid Note CC value. It must be a non-negative number.');
    }
  
    // Find the presence by its ID
    const presence = await this.PresenceModel.findById(presenceId);
    if (!presence) {
      throw new Error('Presence not found');
    }
  
    // Ensure mark is treated as an array of numbers
    const markArray: number[] = Array.isArray(presence.mark) ? presence.mark : [];
  
    // Calculate the average of the marks in the array
    const markAverage = markArray.length > 0
      ? markArray.reduce((sum, current) => sum + current, 0) / markArray.length
      : 0;
  
    // Update the noteCc and calculate Moyenne (average)
    presence.noteCc = noteCc;
    presence.Moyenne = (markAverage + noteCc) / 2;
  
    try {
      // Save the updated presence
      const savedPresence = await presence.save();
  
      // Return the saved presence as a plain object
      return savedPresence.toObject() as Presence;
    } catch (error) {
      // Handle any errors that occur during saving
      throw new Error(`Failed to save presence: ${error.message}`);
    }
  }
  
  

  async checkAndSendAbsenceNotification(IdEtudiant: string): Promise<void> {
    // Get the last 3 presences of the student
    const presences = await this.PresenceModel.find({ IdEtudiant })  .populate({
      path: 'IdSeance',
      populate: {
        path: 'IdMatiere',
        model: 'matieres'
      }
    })
    .populate({
      path: 'IdEtudiant',
      model: 'users'
    })/* .populate("IdEtudiant") */
      .sort({ Date: -1 }) // Sort by date descending
      .limit(3); // Limit to the last 3 records
  //console.log("presences",presences)
    // Check if all 3 are marked as absent
    const hasThreeConsecutiveAbsences = presences.every(presence => !presence.Etat);
  
    if (hasThreeConsecutiveAbsences) {
      // Send an email notification to the student or concerned parties
      await this.sendAbsenceNotification(IdEtudiant);
    }
  }
  
  async sendAbsenceNotification(IdEtudiant: string): Promise<void> {
    const student = await this.UserModel.findById(IdEtudiant);
    if (student && student.Email) {
      try {
        const transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "1e1dd503b25f18",
            pass: "f27d86acd0781d"
          }
        });
  
        const mailOptions = {
          from: '"School Admin" <admin@school.com>',
          to: student.Email,
          subject: 'Absence Warning',
          text: `Dear ${student.Name}, You have been absent for three consecutive sessions. Please reach out to your instructor.`,
        };
  
        await transporter.sendMail(mailOptions);
        console.log(`Absence notification sent to ${student.Email}`);
      } catch (error) {
        console.error('Error sending absence notification:', error);
      }
    } else {
      console.error('Student not found or email not provided');
    }
  }
  

  
  
  
}
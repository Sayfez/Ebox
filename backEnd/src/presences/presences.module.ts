import { Module } from '@nestjs/common';
import { PresencesService } from './presences.service';
import { PresencesController } from './presences.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { matiereSchema } from 'src/matieres/entities/matiere.entity';
import { presenceSchema } from './entities/presence.entity';
import { SeancesService } from 'src/seances/seances.service';
import { SeancesModule } from 'src/seances/seances.module';
import { userSchema } from 'src/users/entities/user.entity';
import { salleSchema } from 'src/salles/entities/salle.entity';
import { presenceEnseignantsSchema } from 'src/presence-enseignants/entities/presence-enseignant.entity';
import { seanceSchema } from 'src/seances/entities/seance.entity';
import { EtudiantSchema } from 'src/etudiants/entities/etudiant.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'presences', schema: presenceSchema},
      {name: 'users', schema: userSchema},
      {name: 'salles', schema: salleSchema},
      {name: 'presenceEnseignants', schema:presenceEnseignantsSchema},
      {name:'seances', schema: seanceSchema}    ]),
  SeancesModule
  ], 
  controllers: [PresencesController],
  providers: [PresencesService] 
})
export class PresencesModule {}

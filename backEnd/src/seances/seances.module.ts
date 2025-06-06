import { Module } from '@nestjs/common';
import { SeancesService } from './seances.service';
import { SeancesController } from './seances.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { seanceSchema } from './entities/seance.entity';
import { salleSchema } from 'src/salles/entities/salle.entity';
import { matiereSchema } from 'src/matieres/entities/matiere.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'seances', schema: seanceSchema }, { name: 'salles', schema: salleSchema }, { name: 'matieres', schema: matiereSchema }]),
  ],
  //exports: []
  controllers: [SeancesController],
  providers: [SeancesService],
  exports: [SeancesService]
})
export class SeancesModule { }

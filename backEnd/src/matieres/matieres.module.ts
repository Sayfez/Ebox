import { Module } from '@nestjs/common';
import { MatieresService } from './matieres.service';
import { MatieresController } from './matieres.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { matiereSchema } from './entities/matiere.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'matieres', schema: matiereSchema}]),
  ],
  controllers: [MatieresController], 
  providers: [MatieresService],
})
export class MatieresModule {}

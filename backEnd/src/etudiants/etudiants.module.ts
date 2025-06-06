import { Module } from '@nestjs/common';
import { EtudiantsService } from './etudiants.service';
import { EtudiantsController } from './etudiants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EtudiantSchema } from './entities/etudiant.entity';
import { userSchema } from 'src/users/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: userSchema}]),
  ],
  controllers: [EtudiantsController],
  providers: [EtudiantsService],
})
export class EtudiantsModule {} 

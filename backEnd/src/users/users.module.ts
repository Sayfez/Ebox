import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './entities/user.entity';
import { EtudiantSchema } from 'src/etudiants/entities/etudiant.entity';
import { enseignantSchema } from 'src/enseignants/entities/enseignant.entity';


@Module({

  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: userSchema, discriminators:[{name: 'etudiants', schema: EtudiantSchema},{name: 'enseignant', schema: enseignantSchema}]}]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MatieresModule } from './matieres/matieres.module';
import { PresencesModule } from './presences/presences.module';
import { EtudiantsModule } from './etudiants/etudiants.module';
import { EnseignantsModule } from './enseignants/enseignants.module';
import { SallesModule } from './salles/salles.module';
import { SeancesModule } from './seances/seances.module';
import { UsersModule } from './users/users.module';
import { PresenceEnseignantsModule } from './presence-enseignants/presence-enseignants.module';
import { ServeStaticModule } from '@nestjs/serve-static'; //
import { join } from 'path'; //
import { ClasseModule } from './classe/classe.module';
import { AuthentificationModule } from './authentification/authentification.module';
import { ConfigModule } from '@nestjs/config';
import { ReclamationsModule } from './reclamations/reclamations.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017',{dbName:'GestionPresence'}),
    MatieresModule,
    PresencesModule,
    EtudiantsModule,
    EnseignantsModule,
    SallesModule,
    SeancesModule,
    UsersModule,
    PresenceEnseignantsModule,
    ConfigModule.forRoot({ isGlobal: true}),
    ClasseModule,
    AuthentificationModule,
    ReclamationsModule, //gateway

     ServeStaticModule.forRoot({ //
      rootPath: join(__dirname, '..', 'upload'), // Adjust the path as necessary
      serveRoot: '/upload', // Serve the files under the /upload path
    }) //
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

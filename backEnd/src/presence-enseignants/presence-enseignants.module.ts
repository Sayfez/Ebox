import { Module } from '@nestjs/common';
import { PresenceEnseignantsService } from './presence-enseignants.service';
import { PresenceEnseignantsController } from './presence-enseignants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { presenceEnseignantsSchema } from './entities/presence-enseignant.entity';
import { SeancesModule } from 'src/seances/seances.module';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'presenceEnseignants', schema: presenceEnseignantsSchema}]),
    SeancesModule
  ],
  controllers: [PresenceEnseignantsController],
  providers: [PresenceEnseignantsService,SeancesModule],
})  
export class PresenceEnseignantsModule {}

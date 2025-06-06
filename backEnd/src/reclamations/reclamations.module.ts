import { Module } from '@nestjs/common';
import { ReclamationsService } from './reclamations.service';
import { ReclamationsController } from './reclamations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { reclamationSchema } from './entities/reclamation.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'reclamations', schema: reclamationSchema}]),
  ],
  controllers: [ReclamationsController],
  providers: [ReclamationsService],
})
export class ReclamationsModule {}

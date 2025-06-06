import { Module } from '@nestjs/common';
import { SallesService } from './salles.service';
import { SallesController } from './salles.controller';
import { salleSchema } from './entities/salle.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'salles', schema: salleSchema}]),
  ],
  controllers: [SallesController],
  providers: [SallesService],
})
export class SallesModule {}

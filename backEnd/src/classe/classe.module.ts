import { Module } from '@nestjs/common';
import { ClasseService } from './classe.service';
import { ClasseController } from './classe.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClasseSchema } from './entities/classe.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Classe', schema: ClasseSchema}]),
  ],
  controllers: [ClasseController], 
  providers: [ClasseService],
})
export class ClasseModule {}

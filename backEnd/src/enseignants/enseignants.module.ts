import { Module } from '@nestjs/common';
import { EnseignantsService } from './enseignants.service';
import { EnseignantsController } from './enseignants.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { enseignantSchema } from './entities/enseignant.entity';
import { userSchema } from 'src/users/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'users', schema: userSchema}])
  ],
  controllers: [EnseignantsController],
  providers: [EnseignantsService],
})
export class EnseignantsModule {}

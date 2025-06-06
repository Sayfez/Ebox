import { IsNotEmpty, IsString } from "class-validator";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class CreateEnseignantDto extends CreateUserDto {

  
    role: string; //heritage fils

          //relations ...
          readonly IdSeance: String[] // many lessons
  
          //readonly IdMatiere: String[] // many Matieres
}

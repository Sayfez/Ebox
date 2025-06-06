import { IsNotEmpty, IsString } from "class-validator";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class CreateEtudiantDto extends CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly Identifiant: string;

    @IsString()
    @IsNotEmpty()
    readonly TagStudent: string;
    
    role: string; // heritage fils
    readonly IdClasse: string;
}


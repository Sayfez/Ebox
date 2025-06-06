import { IsNotEmpty, IsString } from "class-validator";

export class CreateSeanceDto {
    
    @IsNotEmpty()
    readonly DateSc: string;
    @IsString()
    @IsNotEmpty()
    readonly HeureDebut: String;
    @IsString()
    @IsNotEmpty()
    readonly Heurefin: String;

    
    //relations ...
    IdEnseignant: string
    /*IdEtudiant: String[] // many students */
    IdMatiere: string
    IdSalle: string
}

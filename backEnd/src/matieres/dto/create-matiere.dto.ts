import { IsNotEmpty, IsString } from "class-validator";

export class CreateMatiereDto {
    @IsString()
    @IsNotEmpty()
    readonly NomMatiere: string;

     taux : number;

    //relations ...
    readonly IdSeance: string[]; // many lessons
    //readonly IdEnseignants: String[]
}

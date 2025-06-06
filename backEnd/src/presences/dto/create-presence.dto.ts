import { IsNotEmpty, IsString } from "class-validator";

export class CreatePresenceDto {
    @IsString()
    @IsNotEmpty()
    /*readonly Etat: boolean;
    /*@IsString()
    @IsNotEmpty()
    readonly Date: Date;*/
/*
    readonly IdEtudiant: String;
    readonly IdSeance: string;*/

    readonly Data1 : string;
    readonly Data2 : string;
    readonly Data3 : string;
    readonly mark : number;
    readonly Moyenne : number;
    readonly noteCc : number;

}

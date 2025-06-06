import { IsString } from "class-validator";

export class CreateReclamationDto {
    @IsString()
    readonly Objet: string;
    @IsString()
    readonly Message: string;

    //relations ...
   IdUser: string; // many users
}

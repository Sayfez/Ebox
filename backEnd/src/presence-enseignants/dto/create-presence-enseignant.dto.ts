import { IsNotEmpty, IsString } from "class-validator";

export class CreatePresenceEnseignantDto {

    @IsString()
    @IsNotEmpty()
     State: boolean;

    readonly IdEnseignant: String;
    readonly IdSeance: string;
}

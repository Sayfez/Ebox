import { IsNotEmpty, IsString } from "class-validator";

export class CreateSalleDto {
    @IsString()
    @IsNotEmpty()
    readonly IdentifiantSalle: string;
    @IsString()
    @IsNotEmpty()
    readonly NumSalle: string;
}

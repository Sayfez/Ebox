import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    readonly Name: string;
    @IsString()
    @IsNotEmpty()
    readonly FamilyName: string;
    @IsString()
    @IsNotEmpty()
    readonly Username: string;
    @IsString()
    @IsNotEmpty()
    readonly Password: string;
    @IsString()
    @IsNotEmpty()
    readonly Email: string;
    @IsString()
    @IsNotEmpty()
    Photo: string;
    
    readonly role: string;
    @IsString()
    @IsNotEmpty()
    readonly Tag: string;
    IdClasse:string
    @IsString()
    refreshToken: string;

}

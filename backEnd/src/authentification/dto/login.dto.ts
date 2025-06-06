import { IsNotEmpty } from "class-validator";

export class CreateLoginDto {
    @IsNotEmpty()
    readonly Email: string;
    @IsNotEmpty()
    readonly Password: string;
}

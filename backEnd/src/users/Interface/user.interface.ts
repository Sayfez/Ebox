import { Document } from "mongoose";

export interface Iuser extends Document {
    readonly Name: string;
readonly FamilyName: string;
readonly Username: string;
readonly Password: string;
readonly Email: string;
readonly Photo: string;
 role: string;
 Tag: string;
 IdClasse:string
 refreshToken: string;
 id: string;
}

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({timestamps: true})
export class Etudiant {
    role: string; //heritage fils //
    @Prop({required: true, unique: true})
    Identifiant: string;
    
    //@Prop({required: true, unique: true})
    //TagStudent: string;

   //relations ...
   @Prop([{ type: SchemaTypes.ObjectId, ref: 'Seances'}])
   IdSeance: Types.ObjectId[] // many lessons
   @Prop({type: SchemaTypes.ObjectId, ref: 'Classe'})
   IdClasse: Types.ObjectId
}
export const EtudiantSchema = SchemaFactory.createForClass(Etudiant);

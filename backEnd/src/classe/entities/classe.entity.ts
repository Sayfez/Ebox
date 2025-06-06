import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: true })
export class Classe {
@Prop()
Name : string
//relations ...
@Prop([{ type: SchemaTypes.ObjectId, ref: 'etudiants'}])
IdEtudiant: Types.ObjectId[] 

}
export const ClasseSchema = SchemaFactory.createForClass(Classe);

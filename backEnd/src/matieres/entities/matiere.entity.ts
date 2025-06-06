import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: true })
export class matiere {
@Prop({required: true, unique: true})
NomMatiere: string;
@Prop()
//taux : number;

//relations ...
@Prop([{ type: SchemaTypes.ObjectId, ref: 'Seances'}])
IdSeance: Types.ObjectId[] // many lessons

/*@Prop([{ type: SchemaTypes.ObjectId, ref: 'Enseignants'}])
IdEnseignants: Types.ObjectId[] // many Enseignants*/

}
export const matiereSchema = SchemaFactory.createForClass(matiere);

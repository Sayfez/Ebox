import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({timestamps: true})
export class Enseignant {

 
 
    
    role: string; //heritage fils


    //relations ...
    @Prop([{ type: SchemaTypes.ObjectId, ref: 'Seances'}])
    IdSeance: Types.ObjectId[] // many lessons

    //@Prop([{ type: SchemaTypes.ObjectId, ref: 'Matieres'}])
    //IdMatiere: Types.ObjectId[] // many Matieres
    
}
export const enseignantSchema = SchemaFactory.createForClass(Enseignant);
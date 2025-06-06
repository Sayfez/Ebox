import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({timestamps: true})
export class Presence {
    @Prop({required: true, default: false})
Etat: boolean;
//////////////////////////////////////////
@Prop({default:null})
mark: number[]; 
@Prop({default:0} )
Moyenne : number;
//////////////////////////////////////////
   @Prop( )
   noteCc?: number;


//relations 
@Prop({ type: SchemaTypes.ObjectId, ref: 'Etudiants'})
    IdEtudiant: Types.ObjectId // many students
    @Prop({ type: SchemaTypes.ObjectId, ref: 'seances'})
    IdSeance: Types.ObjectId
}
export const presenceSchema = SchemaFactory.createForClass(Presence);

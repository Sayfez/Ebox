import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({timestamps: true})
export class Salle {
    @Prop({required: true, unique: true})
    IdentifiantSalle: string;
    @Prop({required: true, unique: true})
    NumSalle: string;

    //relations 
    @Prop([{ type: SchemaTypes.ObjectId, ref: 'Seances'}])
    IdSeances: Types.ObjectId[] // many lessons
}
export const salleSchema = SchemaFactory.createForClass(Salle);
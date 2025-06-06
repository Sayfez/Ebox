import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({timestamps: true})
export class Seance {
    @Prop({required: true})
    DateSc: string;
    @Prop({required: true})
    HeureDebut: String;
    @Prop({required: true})
    HeureFin: String;


    //relations ...
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Enseignants'})
    IdEnseignant: Types.ObjectId
    /*@Prop([{ type: SchemaTypes.ObjectId, ref: 'Etudiants'}])
    IdEtudiant: Types.ObjectId[] // many students */
    @Prop({ type: SchemaTypes.ObjectId, ref: 'matieres'})
    IdMatiere: Types.ObjectId

    //presence???

    @Prop({ type: SchemaTypes.ObjectId, ref: 'salles'})
    IdSalle: Types.ObjectId // 1 lesson fiha
}
export const seanceSchema = SchemaFactory.createForClass(Seance);
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: true })
export class PresenceEnseignant {
    @Prop({required: true, default: false})
State: boolean;


//relations 
@Prop({ type: SchemaTypes.ObjectId, ref: 'Enseignants'})
    IdEnseignant: Types.ObjectId // many profs
    @Prop({ type: SchemaTypes.ObjectId, ref: 'seances'})
    IdSeance: Types.ObjectId
}
export const presenceEnseignantsSchema = SchemaFactory.createForClass(PresenceEnseignant);


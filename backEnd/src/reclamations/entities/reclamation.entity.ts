import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: true })
export class Reclamation {
  
    @Prop()
        Objet: string;
    @Prop()
Message: string;

//relations ...
@Prop([{ type: SchemaTypes.ObjectId, ref: 'users'}])
IdUser: Types.ObjectId // many USERS



}
export const reclamationSchema = SchemaFactory.createForClass(Reclamation);

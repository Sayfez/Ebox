import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import * as argon2 from "argon2";

@Schema({ timestamps: true, discriminatorKey:"role" }) //heritage "role" == pere
export class User {

@Prop({required: true})
Name: string;
@Prop({required: true})
FamilyName: string;
@Prop({required: true, unique: true}) 
Username: string;
@Prop({required: true})
Password: string;
@Prop({required: true, unique: true})
Email: string;
@Prop({required: true, })
Photo: string;
@Prop({required: true, unique: true})
Tag: string;
@Prop({required: true})
role: string;
@Prop({type: SchemaTypes.ObjectId, ref: 'Classe'})
   IdClasse: Types.ObjectId
@Prop()
refreshToken: string;

   //relations 
   @Prop([{ type: SchemaTypes.ObjectId, ref: 'reclamations'}])
   IdReclamation: Types.ObjectId[] // many recs
}
export const userSchema = SchemaFactory.createForClass(User).pre("save", async function () {
this.Password = await argon2.hash(this.Password);    
//hashage
});

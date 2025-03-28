import { Prop, Schema as nestschema, SchemaFactory } from '@nestjs/mongoose';
import { Schema, Document } from 'mongoose';

export type UserDocument = User & Document;

@nestschema({ timestamps: true, versionKey:false }) // Enables createdAt and updatedAt automatically
export class User {

   
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true }) 
  DOB: Date;

  @Prop({ required: false })
  location: string;

  @Prop({ required: false })
  gender: string;

  @Prop({ type: Schema.Types.Mixed , required: false}) // Use `Mixed` type for JSON
  preferences: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);

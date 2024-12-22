import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Coach extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  available: boolean;

  @Prop()
  experience: string;

  @Prop({ required: true })
  specialization: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  clients: Types.ObjectId[];

  @Prop({ default: null })
  profilePicture: string; // This will store the file path/URL

  
}

export const CoachSchema = SchemaFactory.createForClass(Coach);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Goals } from './goals.schema';

@Schema()
export class Profile extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  height: number; // in cm

  @Prop({ required: true })
  weight: number; // in kg

  @Prop({ type: Types.ObjectId, ref: 'Goals', required: true })
  goals: Goals;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: null })
  profilePicture: string; 
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
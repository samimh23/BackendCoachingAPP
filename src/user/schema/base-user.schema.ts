// src/modules/users/schemas/base-user.schema.ts
import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export abstract class BaseUser extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  created_at?: Date;

  @Prop()
  updated_at?: Date;
}
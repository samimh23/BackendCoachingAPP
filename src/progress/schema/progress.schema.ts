// src/modules/goals/schemas/progress.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ProgressDocument = Progress & Document;

@Schema({ 
  timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  } 
})
export class Progress extends Document {
  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: Number, required: true })
  value: number;

  @Prop({ type: String })
  note?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Goal', required: true })
  goalId: MongooseSchema.Types.ObjectId;
}

export const ProgressSchema = SchemaFactory.createForClass(Progress);
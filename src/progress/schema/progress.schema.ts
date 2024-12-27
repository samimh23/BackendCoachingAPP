// src/modules/progress/schemas/progress.schema.ts
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
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Client', required: true })
  clientId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Goal', required: true })
  goalId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  value: number;

  @Prop()
  notes?: string;

  // Physical Measurements
  @Prop()
  weight?: number;

  @Prop()
  bodyFat?: number;

  @Prop()
  chest?: number;

  @Prop()
  waist?: number;

  @Prop()
  hips?: number;

  @Prop()
  arms?: number;

  @Prop()
  thighs?: number;

  // Performance Metrics
  @Prop()
  reps?: number;

  @Prop()
  sets?: number;

 

  @Prop()
  duration?: number;

  // Photos
  @Prop({ type: [String] })
  progressPhotos?: string[];

  @Prop({ 
    type: Map,
    of: String 
  })
  additionalMetrics?: Record<string, any>;

  @Prop()
  mood?: string;

  @Prop()
  energyLevel?: number;

  @Prop()
  difficulty?: number;
}

export const ProgressSchema = SchemaFactory.createForClass(Progress);

// Add indexes for better query performance
ProgressSchema.index({ clientId: 1, date: -1 });
ProgressSchema.index({ goalId: 1, date: -1 });
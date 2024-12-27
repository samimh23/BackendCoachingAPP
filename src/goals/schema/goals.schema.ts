// src/modules/goals/schemas/goal.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type GoalDocument = Goal & Document;

@Schema({ 
  timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  } 
})
export class Goal extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  targetDate: Date;

  @Prop({ 
    type: String,
    enum: ['weight_loss', 'muscle_gain', 'endurance', 'strength', 'other'],
    required: true 
  })
  category: string;

  @Prop({ 
    type: String,
    enum: ['not_started', 'in_progress', 'completed', 'cancelled'],
    default: 'not_started' 
  })
  status: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Client', required: true })
  clientId: MongooseSchema.Types.ObjectId;

  @Prop()
  targetValue?: number;

  @Prop()
  startValue?: number;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Progress' }] })
  progressUpdates?: MongooseSchema.Types.ObjectId[];

  @Prop()
  completedDate?: Date;

  @Prop({ type: Boolean, default: false })
  isArchived: boolean;

  @Prop()
  priority?: number;

  @Prop({ type: [String] })
  tags?: string[];

  @Prop({ type: [{ 
    date: Date,
    note: String
  }] })
  notes?: Record<string, any>[];
}

export const GoalSchema = SchemaFactory.createForClass(Goal);

// Add indexes
GoalSchema.index({ clientId: 1, status: 1 });
GoalSchema.index({ category: 1 });
GoalSchema.index({ targetDate: 1 });
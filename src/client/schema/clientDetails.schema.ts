// src/modules/progress/schemas/progress.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Client } from './client.schema';

export class Details extends Client {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Client', required: true })
  clientId: MongooseSchema.Types.ObjectId;

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

   // Fitness Profile
  @Prop({
    type: {
      weight: Number,
      height: Number,
      bodyFatPercentage: Number,
      date: { type: Date, default: Date.now }
    }
  })
  initialMeasurements?: Record<string, any>;
  @Prop({ type: [String] })
  healthConditions?: string[];

  @Prop({ type: [String] })
  injuries?: string[];
 
  // Initial Physical Measurements

  @Prop({
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'professional'],
    default: 'beginner'
  })
  fitnessLevel?: string;
  
  // Training Preferences
  @Prop({ type: [{ 
    day: { type: String, enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
    startTime: String,
    endTime: String,
    available: { type: Boolean, default: true }
  }] })
  availability?: Record<string, any>[];

  @Prop({ type: [String], 
    enum: ['strength', 'cardio', 'flexibility', 'hiit', 'yoga', 'crossfit', 'other'] 
  })
  preferredWorkoutTypes?: string[];


  // Nutrition Information
  @Prop({
    type: {
      dietaryRestrictions: [String],
      foodAllergies: [String],
      dailyCalorieTarget: Number,
      mealPreferences: [String]
    }
  })
  nutritionInfo?: Record<string, any>;



}
// Add indexes for better query performa
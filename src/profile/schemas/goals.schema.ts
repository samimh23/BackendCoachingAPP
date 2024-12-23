import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum FitnessGoalType {
  LOSE_WEIGHT = 'lose_weight',
  GAIN_MUSCLE = 'gain_muscle'
}

@Schema()
export class Goals extends Document {
  @Prop({ required: true, enum: FitnessGoalType })
  fitnessGoal: FitnessGoalType;

  @Prop({ required: true })
  dailyWaterIntake: number; // in liters

  @Prop({ required: true })
  targetweight: number; // in kg
  
  @Prop({ required: true })
  targetcalories: number; // in kcal


  @Prop({ required: true })
  dailySleepGoal: number; // in hours
}

export const GoalsSchema = SchemaFactory.createForClass(Goals);
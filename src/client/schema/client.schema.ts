// src/modules/clients/schemas/client.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { UserRole } from '../../common/constants/role.enum';
import { BaseUser } from 'src/user/schema/base-user.schema';

export type ClientDocument = Client & Document;

@Schema({ 
  timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  } 
})
export class Client extends BaseUser {
  @Prop({ default: UserRole.CLIENT })
  role: UserRole;

  // Personal Information
  @Prop()
  dateOfBirth?: Date;

  @Prop({
    type: String,
    enum: ['male', 'female', 'other'],
  })
  gender?: string;

  @Prop()
  phoneNumber?: string;

  // Initial Physical Measurements
  @Prop({
    type: {
      weight: Number,
      height: Number,
      bodyFatPercentage: Number,
      date: { type: Date, default: Date.now }
    }
  })
  initialMeasurements?: Record<string, any>;

  // References to other schemas
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Goal' }] })
  goals?: MongooseSchema.Types.ObjectId[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Progress' }] })
  progressRecords?: MongooseSchema.Types.ObjectId[];

  // Fitness Profile
  @Prop({
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'professional'],
    default: 'beginner'
  })
  fitnessLevel?: string;

  @Prop({ type: [String] })
  healthConditions?: string[];

  @Prop({ type: [String] })
  injuries?: string[];

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

  // Coaching Relationship
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Coach' })
  coach?: MongooseSchema.Types.ObjectId;

  @Prop({
    type: {
      startDate: Date,
      endDate: Date,
      type: { type: String, enum: ['monthly', 'quarterly', 'yearly'] },
      status: { 
        type: String, 
        enum: ['active', 'inactive', 'pending', 'suspended'],
        default: 'pending'
      }
    }
  })
  subscription?: Record<string, any>;

  // Communication Settings
  @Prop({
    type: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      pushNotifications: { type: Boolean, default: true },
      language: { type: String, default: 'en' }
    }
  })
  communicationPreferences?: Record<string, any>;

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

  // Emergency Contact
  @Prop({
    type: {
      name: String,
      relationship: String,
      phoneNumber: String,
      email: String
    }
  })
  emergencyContact?: Record<string, any>;

  // Account Status
  @Prop({
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  })
  accountStatus?: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);

// Enhanced indexes for better query performance
ClientSchema.index({ email: 1 }, { unique: true });
ClientSchema.index({ coach: 1 });
ClientSchema.index({ 'subscription.status': 1 });
ClientSchema.index({ accountStatus: 1 });
ClientSchema.index({ fitnessLevel: 1 });
ClientSchema.index({ 'subscription.endDate': 1 });
ClientSchema.index({ created_at: -1 });
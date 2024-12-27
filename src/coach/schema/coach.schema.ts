// src/modules/coaches/schemas/coach.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { UserRole } from 'src/common/constants/role.enum';
import { BaseUser } from 'src/user/schema/base-user.schema';

export type CoachDocument = Coach & Document;

@Schema({ 
  timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  } 
})
export class Coach extends BaseUser {
  @Prop({ default: UserRole.COACH })
  role: UserRole;

  @Prop()
  specialization?: string;

  @Prop()
  bio: string;

  @Prop()
  yearsOfExperience?: number;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Client' }] })
  clients?: MongooseSchema.Types.ObjectId[];

  @Prop()
  biography?: string;

  @Prop({ type: [String] })
  certifications?: string[];

  @Prop()
  hourlyRate?: number;

  @Prop()
  availability?: string;

  @Prop({ type: Object })
  workingHours: {
    days: string[];
    hours: {
      start: string;
      end: string;
    };
  };

  @Prop({ default: null })
  profilePicture: string;
}

export const CoachSchema = SchemaFactory.createForClass(Coach);

import { Type } from 'class-transformer';
import { IsNumber, Min, IsObject } from 'class-validator';
import { CreateGoalsDto } from './goal.dto';

export class CreateProfileDto {
    @IsNumber()
    @Min(0)
    height: number;
  
    @IsNumber()
    @Min(0)
    weight: number;
  
    @IsObject()
    @Type(() => CreateGoalsDto)
    goals: CreateGoalsDto;
  }
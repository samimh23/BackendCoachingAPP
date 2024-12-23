import { IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateGoalsDto {
  @IsNotEmpty()
  fitnessGoal: 'lose_weight' | 'gain_muscle';

  @IsNumber()
  @Min(0)
  dailyWaterIntake: number;

  @IsNumber()
  @Min(0)
  dailySleepGoal: number;
}
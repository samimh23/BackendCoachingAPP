import { Module } from '@nestjs/common';
import { CoachService } from './coach.service';
import { CoachController } from './coach.controller';
import { Coach, CoachSchema } from './schema/coach.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshToken, RefreshTokenSchema } from 'src/auth/schema/refresh-token.schema';

@Module({

  imports: [
  MongooseModule.forFeature([
    { name: Coach.name, schema: CoachSchema },
    { name: RefreshToken.name, schema: RefreshTokenSchema },
    
    
  ]),],
  controllers: [CoachController],
  providers: [CoachService],
})
export class CoachModule {}

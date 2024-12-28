import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CoachModule } from './coach/coach.module';
import { ClientModule } from './client/client.module';
import { UserModule } from './user/user.module';
import { GoalsModule } from './goals/goals.module';
import { ProgressModule } from './progress/progress.module';

@Module({
  imports: [AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/CoachingDB'),
    CoachModule,
    ClientModule,
    UserModule,
    GoalsModule,
    ProgressModule]
    ,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

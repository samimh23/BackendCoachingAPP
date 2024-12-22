import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Goals, GoalsSchema } from './schemas/goals.schema';
import { Profile, ProfileSchema } from './schemas/profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Profile.name, schema: ProfileSchema },
      { name: Goals.name, schema: GoalsSchema }
    ])
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}

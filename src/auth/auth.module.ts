import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from 'src/client/schema/client.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]), 
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from 'src/client/schema/client.schema';
import { Coach, CoachDocument } from 'src/coach/schema/coach.schema';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from 'src/common/constants/role.enum';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Coach.name) private coachModel: Model<CoachDocument>,
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
    private jwtService: JwtService,
  ) {}
  async signup(registerDto: RegisterDto) {
    const { email, password, role, name } = registerDto;

    // Check if email already exists in either collection
    const existingCoach = await this.coachModel.findOne({ email }).exec();
    const existingClient = await this.clientModel.findOne({ email }).exec();

    if (existingCoach || existingClient) {
      throw new ConflictException('Email already exists');
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      let user;
      const userData = {
        email,
        password: hashedPassword,
        name,
        role,
      };

      // Create user based on role
      if (role === UserRole.COACH) {
        user = await this.coachModel.create(userData);
      } else if (role === UserRole.CLIENT) {
        user = await this.clientModel.create(userData);
      } else {
        throw new BadRequestException('Invalid role');
      }

      // Generate JWT token
      const token = this.generateToken(user);

      // Return user data (excluding password) and token
      const { password: _, ...userWithoutPassword } = user.toObject();
      
      return {
        user: userWithoutPassword,
        token,
      };
    } catch (error) {
      if (error.code === 11000) { // MongoDB duplicate key error
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  private generateToken(user: CoachDocument | ClientDocument) {
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update() {
    return ;
  }

  remove(id: number) {
    return ;
  }
}

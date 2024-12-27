// src/modules/auth/dto/register.dto.ts
import { IsEmail, IsString, IsEnum, MinLength, IsNotEmpty, Matches } from 'class-validator';
import { UserRole } from '../../common/constants/role.enum';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character'
  })
  password: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
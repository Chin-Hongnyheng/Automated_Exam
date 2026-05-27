import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.schema';
import { CreateLoginInput } from './dto/login.input';
import { CreateRegisterInput } from './dto/register.input';

const uuidv4 = () =>
  Math.random().toString(36).substring(2, 15) + Date.now().toString(36);

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(private jwt: JwtService) {}

  async register(input: CreateRegisterInput) {
    const { userName, email, password, confirmPassword } = input;

    if (password !== confirmPassword) {
      throw new UnauthorizedException('Passwords do not match');
    }

    if (this.users.find((u) => u.email === email)) {
      throw new UnauthorizedException('Email already exists');
    }

    if (this.users.find((u) => u.userName === userName)) {
      throw new UnauthorizedException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: User = {
      id: uuidv4(),
      userName,
      email,
      password: hashedPassword,
    };

    this.users.push(user);

    const payload = {
      sub: user.id,
      email: user.email,
      userName: user.userName,
    };

    const accessToken = this.jwt.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET!,
      expiresIn: process.env.JWT_ACCESS_EXPIRES as any,
    });

    const refreshToken = this.jwt.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET!,
      expiresIn: process.env.JWT_REFRESH_EXPIRES as any,
    });

    return {
      message: 'User registered successfully',
      accessToken,
      refreshToken,
    };
  }

  async login(input: CreateLoginInput) {
    const user = this.users.find((u) => u.email === input.email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValid = await bcrypt.compare(input.password, user.password);

    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: user.id,
      email: user.email,
      userName: user.userName,
    };

    const accessToken = this.jwt.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET!,
      expiresIn: process.env.JWT_ACCESS_EXPIRES as any,
    });

    const refreshToken = this.jwt.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET!,
      expiresIn: process.env.JWT_REFRESH_EXPIRES as any,
    });
    return { accessToken, refreshToken };
  }

  getMe(userId: string) {
    const user = this.users.find((u) => u.id === userId);
    if (!user) throw new UnauthorizedException('User not found');
    return { id: user.id, userName: user.userName, email: user.email };
  }
}

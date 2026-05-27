import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateLoginInput } from './dto/login.input';
import { CreateRegisterInput } from './dto/register.input';
import { LoginResponse } from './dto/login.response';
import { RegisterResponse } from './dto/register.response';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserType } from './dto/user.type';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => String)
  health(): string {
    return 'OK';
  }

  @Mutation(() => RegisterResponse)
  register(@Args('input') input: CreateRegisterInput) {
    return this.userService.register(input);
  }

  @Mutation(() => LoginResponse)
  login(@Args('input') input: CreateLoginInput) {
    return this.userService.login(input);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserType)
  async getMe(@Context() ctx: any) {
    const userId = ctx.req.user?.userId;
    if (!userId) throw new UnauthorizedException('Unauthorized');
    return this.userService.getMe(userId);
  }
}

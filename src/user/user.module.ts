import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { JwtStrategy } from '../strategy/jwt-auth.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [UserService, UserResolver, JwtStrategy],
  exports: [JwtModule, PassportModule],
})
export class UserModule {}

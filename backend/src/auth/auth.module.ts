import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtCookieStrategy, JwtSecretKey } from './jwt-cookie.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: JwtSecretKey,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtCookieStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
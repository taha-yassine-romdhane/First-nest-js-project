import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../typeorm/entities/User";
import { Profile } from "../typeorm/entities/Profile";
import { Post } from "../typeorm/entities/Post";


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'abc123',
      signOptions: {
        expiresIn: '24h'
      }
    }),
    TypeOrmModule.forFeature([User , Profile , Post])
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy ],
  controllers: [AuthController]
})
export class AuthModule {}

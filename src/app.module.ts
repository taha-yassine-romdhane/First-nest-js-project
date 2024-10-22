import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { Profile } from './typeorm/entities/Profile';
import { Post } from './typeorm/entities/Post';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(
    {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username:'root',
    password:'',
    database: 'nestjs_tutorial_db',
    entities: [User ,Profile ,Post ],
    synchronize: true,
    }), UsersModule, AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

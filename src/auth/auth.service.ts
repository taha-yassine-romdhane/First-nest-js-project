import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from "./authDto/auth.dto";
import { JwtService } from "@nestjs/jwt";
import { User } from "../typeorm/entities/User";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService ,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
  }

  async validateUser({ username, password }: AuthPayloadDto) {
    const findUser = await this.userRepository.findOne({ where: { username } });
    if (!findUser) return ('user not found');
    const isValidPassword = await bcrypt.compare(password, findUser.password);
    if (isValidPassword) {
      const { password: pwd, ...user } = findUser;
      return this.jwtService.sign(user);
    } else {
      return null;
    }
  }
}
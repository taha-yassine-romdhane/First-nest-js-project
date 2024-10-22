import { Body, Controller, Get,  Post, Req, UseGuards } from "@nestjs/common";
import { AuthPayloadDto } from "./authDto/auth.dto";
import { AuthService } from "./auth.service";
import { LocalGuard } from "./guards/local.guard";
import { Request } from "express";
import { JwtAuthGuard } from "./guards/jwt.guard";
import * as console from "node:console";

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;

  }
  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request){
    console.log('Inside Auth Controller status method');
    console.log(req.user);
    return req.user
  }
}

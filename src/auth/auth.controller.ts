import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

import { UserService } from '../user/user.service';
import { RegisterDto } from './models/register.dto';

@Controller()
export class AuthController {
  constructor(
    private _userService: UserService,
    private _jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    if (body.password !== body.password_confirm) {
      throw new BadRequestException('Password do not match!');
    }

    return await this._userService.create(body);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this._userService.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials!');
    }

    const jwt = await this._jwtService.signAsync({ id: user.id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return user;
  }

  @Get('user')
  async user(@Req() request: Request) {
    const data = await this._jwtService.verifyAsync(request.cookies?.jwt);

    return this._userService.findOne({ id: data?.id });
  }
}

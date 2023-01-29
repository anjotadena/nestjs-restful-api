import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './models/register.dto';
import * as bcrypt from 'bcrypt';

@Controller()
export class AuthController {
  constructor(private _userService: UserService) {}

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
  ) {
    const user = await this._userService.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials!');
    }

    return user;
  }
}

import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './models/register.dto';

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
}

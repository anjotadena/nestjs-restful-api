import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller()
export class AuthController {
  constructor(private _userService: UserService) {}

  @Post('register')
  async register(@Body() body) {
    return await this._userService.create(body);
  }
}

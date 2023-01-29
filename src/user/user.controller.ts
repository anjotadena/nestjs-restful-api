import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private _userService: UserService) {}

  @Get('users')
  async all() {
    return await this._userService.all();
  }
}

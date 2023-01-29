import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UserUpdateDto } from './dto/user-update.dto';

@UseInterceptors(ClassSerializerInterceptor) // exlude column
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private _userService: UserService) {}

  @Get()
  async all() {
    return await this._userService.all();
  }

  @Post()
  async create(@Body() body: UserCreateDto): Promise<User> {
    return this._userService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UserUpdateDto,
  ): Promise<User> {
    return this._userService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return this._userService.delete(id);
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<User> {
    return this._userService.findOne({ id });
  }
}

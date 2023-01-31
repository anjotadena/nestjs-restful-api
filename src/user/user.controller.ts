import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UserUpdateDto } from './dto/user-update.dto';
import { AuthService } from '../auth/services/auth/auth.service';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';

@UseInterceptors(ClassSerializerInterceptor) // exlude column
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private _userService: UserService,
    private _authService: AuthService,
  ) {}

  @Get()
  async all() {
    return await this._userService.all();
  }

  @Post()
  async create(@Body() body: UserCreateDto): Promise<User> {
    return this._userService.create(body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return this._userService.delete(id);
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<User> {
    return this._userService.findOne({ id });
  }

  @Put('info')
  async updateInfo(@Req() request: Request, @Body() body: UserUpdateDto) {
    const id = await this._authService.userId(request);

    await this._userService.update(id, body);

    return this._userService.findOne({ id });
  }

  @Put('change-password')
  async updatePassword(
    @Req() request: Request,
    @Body('password') password: string,
    @Body('confirm_password') confirmPassword: string,
  ) {
    if (password !== confirmPassword) {
      throw new BadRequestException('Password do not match!');
    }
    const id = await this._authService.userId(request);

    const hashedPassword = await bcrypt.hash(password, 12);

    return this._userService.update(id, {
      password: hashedPassword,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UserUpdateDto,
  ): Promise<User> {
    return this._userService.update(id, body);
  }
}

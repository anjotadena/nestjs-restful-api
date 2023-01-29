import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';
import { AuthGuard } from '../auth/auth.guard';
import { RoleCreateDto } from './dto/role-create.dto';
import { RoleUpdateDto } from './dto/role-update.dto';

@UseGuards(AuthGuard)
@Controller('roles')
export class RoleController {
  constructor(private _roleService: RoleService) {}

  @Get()
  async all(): Promise<Role[]> {
    return this._roleService.all();
  }

  @Post()
  async create(@Body() body: RoleCreateDto): Promise<Role> {
    return this._roleService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: RoleUpdateDto,
  ): Promise<Role> {
    return this._roleService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return this._roleService.delete(id);
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<Role> {
    console.log('id', id);
    return this._roleService.findOne({ id });
  }
}

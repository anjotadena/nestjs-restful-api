import { Controller, Get } from '@nestjs/common';
import { Permission } from './entities/permission.enityt';
import { PermissionService } from './permission.service';

@Controller('permissions')
export class PermissionController {
  constructor(private _permissionService: PermissionService) {}

  @Get()
  async all(): Promise<Permission[]> {
    return this._permissionService.all();
  }
}

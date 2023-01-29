import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.enityt';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly _permissionRepository: Repository<Permission>,
  ) {}

  async all(): Promise<Permission[]> {
    return this._permissionRepository.find();
  }
}

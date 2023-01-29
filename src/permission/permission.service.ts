import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.enityt';
import { AbstractService } from '../core/services/abstract.service';

@Injectable()
export class PermissionService extends AbstractService {
  constructor(
    @InjectRepository(Permission)
    _permissionRepository: Repository<Permission>,
  ) {
    super(_permissionRepository);
  }
}

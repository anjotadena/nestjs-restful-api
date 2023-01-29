import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly _roleRepository: Repository<Role>,
  ) {}

  async all(): Promise<Role[]> {
    return this._roleRepository.find();
  }

  async create(params: any): Promise<Role> {
    return this._roleRepository.save(params);
  }

  async findOne(condition): Promise<Role> {
    return this._roleRepository.findOne({ where: condition });
  }

  async update(id: number, data: any): Promise<any> {
    return this._roleRepository.update(id, data);
  }

  async delete(id: number): Promise<any> {
    return this._roleRepository.delete(id);
  }
}

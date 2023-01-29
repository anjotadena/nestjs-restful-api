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
    const { permission_ids, ...data } = params;

    return this._roleRepository.save({
      ...data,
      permissions: permission_ids.map((id) => Object.assign({}, { id })),
    });
  }

  async findOne(condition): Promise<Role> {
    return this._roleRepository.findOne({
      where: condition,
      relations: ['permissions'],
    });
  }

  async update(id: number, params: any): Promise<any> {
    const { permission_ids, ...data } = params;

    await this._roleRepository.update(id, { name: data?.name });

    const role = await this._roleRepository.findOne({ where: { id } });

    return this._roleRepository.create({
      ...role,
      permissions: permission_ids.map((id) => Object.assign({}, { id })),
    });
  }

  async delete(id: number): Promise<any> {
    return this._roleRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly _userRepository: Repository<User>,
  ) {}

  async all(): Promise<User[]> {
    return this._userRepository.find();
  }

  async create(params): Promise<User> {
    const hashedPassword = await bcrypt.hash('secret', 12);

    return this._userRepository.save({
      ...params,
      password: hashedPassword,
      role: { id: params.role_id },
    });
  }

  async findOne(condition): Promise<User> {
    return this._userRepository.findOne({ where: condition });
  }

  async update(id: number, data: any): Promise<any> {
    if (data.role_id) {
      data = {
        ...data,
        role: { id: data.role_id },
      };

      delete data.role_id;
    }
    console.log(data);
    return this._userRepository.update(id, data);
  }

  async delete(id: number): Promise<any> {
    return this._userRepository.delete(id);
  }
}

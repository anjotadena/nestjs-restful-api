import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './models/user.entity';
import { RegisterDto } from '../auth/models/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async all(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(params: RegisterDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(params.password, 12);

    return this.userRepository.save({
      ...params,
      password: hashedPassword,
    });
  }

  async findOne(condition): Promise<User> {
    return this.userRepository.findOne({ where: condition });
  }
}

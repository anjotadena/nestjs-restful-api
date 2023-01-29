import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './models/user.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async all(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(params: any): Promise<User> {
    const hashedPassword = await bcrypt.hash(params.password, 12);

    return this.userRepository.save({
      ...params,
      password: hashedPassword,
    });
  }
}

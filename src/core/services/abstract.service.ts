import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export abstract class AbstractService {
  constructor(protected readonly repository: Repository<any>) {}

  async all(relations = []): Promise<any[]> {
    return this.repository.find({ relations });
  }

  async create(params): Promise<any> {
    return this.repository.save(params);
  }

  async findOne(condition, relations = []): Promise<any> {
    return this.repository.findOne({ where: condition, relations });
  }

  async update(id: number, data: any): Promise<any> {
    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<any> {
    return this.repository.delete(id);
  }

  //   @todo
  //   paginate method
}

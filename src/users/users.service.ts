import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}

  create(username: string, password: string) {
    const user = this.repo.create({ username, password });

    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id: id } });
  }

  find(user) {
    return this.repo.find({ where: { username: user } });
  }

  async update(id: number, attrs: Partial<UserEntity>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  async remove(id: number) {
    // this is good if you don't want to use the hooks in typeorm entites folder
    //return await this.repo.delete({id})
    //this method is when you want to use the hooks
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }

    return this.repo.remove(user);
  }
}

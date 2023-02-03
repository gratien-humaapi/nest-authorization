import { EntityManager } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private em: EntityManager,
  ) {}
  async create(createUserInput: CreateUserInput) {
    const user = this.userRepository.create(createUserInput);
    await this.userRepository.persistAndFlush(user);
    return user;
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ id });
    return user;
  }

  update(iupdateUserInput: UpdateUserInput) {
    return `This action updates a user`;
  }

  remove(id: string) {
    return `This action removes a user`;
  }
}

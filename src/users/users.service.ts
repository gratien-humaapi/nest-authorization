import { EntityManager } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserRepository } from './entities/user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private em: EntityManager,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const user = this.userRepository.create({ ...createUserInput, role: '' });
    await this.userRepository.persistAndFlush(user);
    return user;
  }

  async findAll() {
    const users = await this.userRepository.findAll({ populate: ['role'] });
    return users;
  }

  async findById(id: string) {
    const user = await this.userRepository.findOne(
      { id },
      { populate: ['role'] },
    );
    return user;
  }

  async findByName(name: string) {
    const user = await this.userRepository.findOne(
      { name },
      { populate: ['role'] },
    );
    console.log('here', user);

    return user;
  }

  update(iupdateUserInput: UpdateUserInput) {
    return `This action updates a user`;
  }

  remove(id: string) {
    return `This action removes a user`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Role } from './entities/role.enum';
import { User } from './entities/user.entity';

const users = [
  { id: 1, name: 'John', roles: [Role.ADMIN] },
  { id: 2, name: 'Paul', roles: [Role.USER] },
  { id: 3, name: 'Paris', roles: [Role.USER] },
];

@Injectable()
export class UsersService {
  create(createUserInput: CreateUserInput) {
    return users.push({ id: users.length + 1, ...createUserInput });
  }

  findAll() {
    return users;
  }

  findOne(id: number) {
    return users.find((value) => value.id === id);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

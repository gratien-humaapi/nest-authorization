import { Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';

@Injectable()
export class RolesService {
  create(createRoleInput: CreateRoleInput) {
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: string) {
    return `This action returns a role`;
  }

  update(updateRoleInput: UpdateRoleInput) {
    return `This action updates a role`;
  }

  remove(id: string) {
    return `This action removes a role`;
  }
}

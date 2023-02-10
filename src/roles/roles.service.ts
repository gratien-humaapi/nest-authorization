import { Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { RoleRepository } from './entities/role.repository';

@Injectable()
export class RolesService {
  constructor(private readonly roleRepository: RoleRepository) {}

  create(createRoleInput: CreateRoleInput) {
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all roles`;
  }

  async findAllPermissions(id: string) {
    const role = await this.findOne(id);
    // console.log(role);

    return role?.permissions;
  }

  async findOne(id: string) {
    const role = await this.roleRepository.findOne(id);
    return role;
  }

  update(updateRoleInput: UpdateRoleInput) {
    return `This action updates a role`;
  }

  remove(id: string) {
    return `This action removes a role`;
  }
}

/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
import { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { PermissionsEnum } from 'src/enum/permission.enum';
import { Role } from 'src/roles/entities/role.entity';
import { userRoles } from 'src/roles/entities/role.seeder';
import { UserFactory } from './user.factory';

export class UserSeeder extends Seeder {
  async run(
    em: EntityManager,
    context: Dictionary<{ roles: Role[] }>,
  ): Promise<void> {
    const { roles } = context;
    console.log(roles);

    const userFactory = new UserFactory(em);
    userFactory.createOne({
      role: roles[0],
      roleId: roles[0].id,
      roleName: roles[0].name,
    });
    userFactory.createOne({
      role: roles[1],
      roleId: roles[1].id,
      roleName: roles[1].name,
    });
    userFactory.createOne({
      role: roles[2],
      roleId: roles[2].id,
      roleName: roles[2].name,
    });
    userFactory.make(3, {
      role: roles[2],
      roleId: roles[2].id,
      roleName: roles[2].name,
    });
  }
}

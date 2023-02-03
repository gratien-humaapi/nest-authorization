/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
import { EntityManager } from '@mikro-orm/core';
import { Dictionary } from '@mikro-orm/core/typings';
import { Seeder } from '@mikro-orm/seeder';
import { PermissionsEnum } from 'src/enum/permission.enum';
import { RoleFactory } from './role.factory';

export const userRoles = [
  {
    name: 'admin',
    permissions: [
      PermissionsEnum.ADD,
      PermissionsEnum.GET,
      PermissionsEnum.LIST,
      PermissionsEnum.UPDATE,
      PermissionsEnum.DELETE,
    ],
  },
  { name: 'guest', permissions: [PermissionsEnum.LIST] },
  {
    name: 'user',
    permissions: [
      PermissionsEnum.ADD,
      PermissionsEnum.GET,
      PermissionsEnum.LIST,
      PermissionsEnum.UPDATE,
    ],
  },
];

export class RoleSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    const promiseData = userRoles.map(async (value) => {
      const roleFactory = new RoleFactory(em);
      const role = await roleFactory.createOne({ ...value });
      return role;
    });
    const rolesCtx = await Promise.all(promiseData);

    context.roles = rolesCtx;
  }
}

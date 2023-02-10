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
      { action: PermissionsEnum.ADD, subject: 'User' },
      { action: PermissionsEnum.GET, subject: 'User' },
      { action: PermissionsEnum.LIST, subject: 'User' },
      { action: PermissionsEnum.UPDATE, subject: 'User' },
      { action: PermissionsEnum.DELETE, subject: 'User' },
    ],
  },
  {
    name: 'guest',
  },
  {
    name: 'user',
    permissions: [
      { action: PermissionsEnum.ADD, subject: 'User' },
      { action: PermissionsEnum.GET, subject: 'User' },
      { action: PermissionsEnum.LIST, subject: 'User' },
      { action: PermissionsEnum.UPDATE, subject: 'User' },
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

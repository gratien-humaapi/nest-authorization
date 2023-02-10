/* eslint-disable prettier/prettier */
import { EntityManager } from '@mikro-orm/sqlite';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from 'src/enum/role.enum';
import defineAbilityFor from './ability/ability.factory';
import { PermissionsEnum } from './enum/permission.enum';
import { Role } from './roles/entities/role.entity';
import { User } from './users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private em: EntityManager) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const adminRoutes = ['findOne', 'createUser'];
    const requireRoles = this.reflector.getAllAndOverride<RolesEnum[]>(
      'roles',
      [context.getHandler(), context.getClass],
    );

    // Permissions
    const permissions = this.reflector.getAllAndOverride<PermissionsEnum[]>(
      'permissions',
      [context.getHandler(), context.getClass],
    );

    // Choose a random user
    const user = await this.em.findOne(
      User,
      {
        id: '2c7d7dba-825a-415a-81f8-abdc27b77305',
      },
      { populate: ['role'] },
    );
    console.log(user);

      const ability = defineAbilityFor(user as User);

      // const canContinue = ability.can()

    // const currentRoute = context.getHandler().name;
    // console.log(currentRoute);

    // const role = await this.em.findOne(Role, { id: user?.roleId });

    // if (!requireRoles) {
    //   return true;
    // }

    // if (requireRoles) {
    //   return requireRoles.some((role) => user?.roleName == role);
    // }

    //* Checking routes
    // if (adminRoutes.includes(currentRoute)) {
    //   if (user && user?.roleName === 'admin') {
    //     return true;
    //   }
    //   return false;
    // }

    // if (!permissions) {
    //   return true;
    // }

    // return permissions.some((permission) =>
    //   role?.permissions.includes(permission),
    // );

    // return permissions.some((permission) =>
    //   user?.permissions.includes(permission),
    // );
    return true;
  }
}

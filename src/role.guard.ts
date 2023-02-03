/* eslint-disable prettier/prettier */
import { EntityManager } from '@mikro-orm/sqlite';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from 'src/enum/role.enum';
import { PermissionsEnum } from './enum/permission.enum';
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
        id: '79e1972c-5db2-4e43-b95b-d5babb2d465a',
      },
      { populate: ['role'] },
    );
    console.log(user);

    // const currentRoute = context.getHandler().name;
    // console.log(currentRoute);


    //* In case we use setMetadata
    // if (!requireRoles) {
    //       return true;
    //     }

    if (requireRoles) {
      return requireRoles.some((role) => user?.roleName == role);
    }

   //* Checking routes
    // if (adminRoutes.includes(currentRoute)) {
    //   if (user && user?.roleName === 'admin') {
    //     return true;
    //   }
    //   return false;
    // }

    if (!permissions) {
      return true;
    }

    // return permissions.some((permission) =>
    //   user?.permissions.includes(permission),
    // );
    return true;
  }
}

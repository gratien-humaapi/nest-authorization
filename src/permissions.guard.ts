/* eslint-disable prettier/prettier */
import { createMongoAbility, MongoAbility } from '@casl/ability';
import { EntityManager } from '@mikro-orm/sqlite';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AppAbility, CaslAbilityFactory } from './ability/ability.factory';
import { PermissionsEnum } from './enum/permission.enum';
import { RolesService } from './roles/roles.service';
import { User } from './users/entities/user.entity';
import { fieldsToRelations } from './utils/fieldsToRelations';
// import { RequiredPermission } from './decorators/permissions.decorator';
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private roleService: RolesService,
    private em: EntityManager,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<PermissionsEnum[]>(
      'permissions',
      context.getHandler(),
    );

    // Get entity name
    const entityName = this.reflector.get<string>('entity', context.getClass());

    console.log({ entityName });

    const ctx = GqlExecutionContext.create(context);
    const info = ctx.getInfo();
    // console.log(info);

    const fieldsPath = fieldsToRelations(info);
    console.log({ fieldsPath });

    const user = await this.em.findOne(
      User,
      {
        id: '3be01925-afa3-4d24-9d83-7c1f8d1b638e',
      },
      { populate: ['role'] },
    );
    // console.log(user);
    const userPermissions = await this.roleService.findAllPermissions(
      `${user?.roleId}`,
    );
    // console.log({ userPermissions });

    const ability = createMongoAbility(userPermissions);
    const allowed = requiredPermissions?.every((permission) => {
      return ability.can(permission, entityName);
    });
    console.log({ allowed });

    return allowed as boolean;
  }
}

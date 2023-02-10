//

import { AbilityBuilder, Ability, createMongoAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { PermissionsEnum } from 'src/enum/permission.enum';
import { RolesService } from 'src/roles/roles.service';
import { User } from 'src/users/entities/user.entity';

export default function defineAbilityFor(user: User) {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (user.roleName == 'admin') {
    can(PermissionsEnum.GET, User);
    can(PermissionsEnum.LIST, User);
    can(PermissionsEnum.ADD, User);
    can(PermissionsEnum.UPDATE, User);
    can(PermissionsEnum.DELETE, User);
  } else {
    can(PermissionsEnum.LIST, User, { roleName: 'guest' });
    can(PermissionsEnum.ADD, User, { roleName: 'user' });
    can(PermissionsEnum.UPDATE, User, { roleName: 'user' });
    cannot(PermissionsEnum.DELETE, User);
  }

  // cannot('delete', 'Post', { published: true });

  return build();
}

export type PermissionObjectType = any;
export type AppAbility = Ability<[PermissionsEnum, PermissionObjectType]>;

@Injectable()
export class CaslAbilityFactory {
  constructor(private roleService: RolesService) {}
  async createForUser(user: User) {
    const dbPermissions = await this.roleService.findAllPermissions(
      user.roleId,
    );
    console.log({ dbPermissions });

    const caslPermissions = dbPermissions?.map((p) => ({
      action: p,
      subject: User.name,
    }));
    console.log({ caslPermissions });

    return createMongoAbility(caslPermissions as any);
  }
}

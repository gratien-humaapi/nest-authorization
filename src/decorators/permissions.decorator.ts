import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { PermissionObjectType } from 'src/ability/ability.factory';
import { PermissionsEnum } from 'src/enum/permission.enum';

// export const Permissions = (...args: string[]) =>
//   SetMetadata('permissions', args);

// action, object
// export type RequiredPermission = [PermissionsEnum, PermissionObjectType];
export const CheckPermissions = (
  ...params: PermissionsEnum[]
): CustomDecorator<string> => SetMetadata('permissions', params);

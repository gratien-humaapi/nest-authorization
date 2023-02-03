import { InputType, OmitType } from '@nestjs/graphql';
import { Role } from '../entities/role.entity';

@InputType()
export class CreateRoleInput extends OmitType(
  Role,
  ['id'] as const,
  InputType,
) {}

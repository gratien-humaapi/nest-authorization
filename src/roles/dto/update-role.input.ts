import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Role } from '../entities/role.entity';

@InputType()
export class UpdateRoleInput extends PartialType(Role) {
  @Field()
  id?: string;
}

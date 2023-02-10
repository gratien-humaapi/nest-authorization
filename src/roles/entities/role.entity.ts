import {
  Embedded,
  Entity,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { v4 } from 'uuid';
import { Permissions } from '../embedded/permissions.embedded';
import { RoleRepository } from './role.repository';

@ObjectType()
@Entity({ customRepository: () => RoleRepository })
export class Role {
  @Field()
  @PrimaryKey({ type: 'uuid', onCreate: () => v4() })
  id: string;

  @Field()
  @Property()
  // @Unique()
  name: string;

  @Field(() => [Permissions])
  @Embedded(() => Permissions, { object: true })
  permissions: Permissions[];
}

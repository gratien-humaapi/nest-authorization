import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Role } from './role.enum';
import { v4 } from 'uuid';
import { UserRepository } from './user.repository';

@ObjectType()
@Entity({ customRepository: () => UserRepository })
export class User {
  @PrimaryKey({ type: 'uuid', onCreate: () => v4() })
  id: string;

  @Field(() => [String])
  @Property()
  roles: [Role];

  @Property()
  @Field({})
  name: string;
}

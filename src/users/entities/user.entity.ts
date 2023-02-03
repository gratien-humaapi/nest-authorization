import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/roles/entities/role.entity';
import { v4 } from 'uuid';
import { UserRepository } from './user.repository';

@ObjectType()
@Entity({ customRepository: () => UserRepository })
export class User {
  @PrimaryKey({ type: 'uuid', onCreate: () => v4() })
  id: string;

  @Field()
  @Property({ persist: false })
  get roleName(): string {
    return this.role?.name ?? '';
  }

  @Field()
  @Property()
  roleId: string;

  @ManyToOne()
  @HideField()
  role: Role;

  @Property()
  @Field({})
  name: string;
}

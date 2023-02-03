/* eslint-disable prettier/prettier */
import { EntityData } from '@mikro-orm/core';
import { Factory, Faker } from '@mikro-orm/seeder';
import { v4 } from 'uuid';
import { Role } from './role.entity';

export class RoleFactory extends Factory<Role> {
  model = Role;

  definition(faker: Faker): Partial<Role> {
    return {
      id: v4(),
      name: 'Placeholder',
    };
  }
}

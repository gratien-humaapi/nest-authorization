/* eslint-disable prettier/prettier */
import { EntityData } from '@mikro-orm/core';
import { Factory, Faker } from '@mikro-orm/seeder';
import { v4 } from 'uuid';
import { Role } from './role.enum';
import { User } from './user.entity';

export class UserFactory extends Factory<User> {
  model = User;

  definition(faker: Faker): Partial<User> {
    return {
      // id: v4()0
      name: faker.name.firstName(),
      roles: [Role.ADMIN],
    };
  }
}

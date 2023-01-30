/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserFactory } from './user.factory';

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    new UserFactory(em).make(10);
  }
}

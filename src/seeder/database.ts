/* eslint-disable prettier/prettier */
import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { RoleSeeder } from 'src/roles/entities/role.seeder';
import { UserSeeder } from 'src/users/entities/user.seeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    return this.call(em, [RoleSeeder,UserSeeder]);
  }
}

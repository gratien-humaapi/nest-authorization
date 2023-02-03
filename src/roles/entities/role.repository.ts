/* eslint-disable prettier/prettier */
import { EntityRepository } from "@mikro-orm/sqlite";
import { Role } from "./role.entity";

export class RoleRepository extends EntityRepository<Role> {}

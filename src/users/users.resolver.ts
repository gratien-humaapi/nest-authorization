import { EntityManager } from '@mikro-orm/postgresql';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EntityName } from 'src/decorators/entity.decorator';
import { CheckPermissions } from 'src/decorators/permissions.decorator';
import { PermissionsEnum } from 'src/enum/permission.enum';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
@EntityName('User')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private em: EntityManager,
  ) {}

  @Mutation(() => User, { name: 'createUser' })
  async create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  // @Permissions(PermissionsEnum.LIST)
  @CheckPermissions(PermissionsEnum.LIST)
  @Query(() => [User], { name: 'users' })
  async list() {
    return this.usersService.findAll();
  }

  // @Roles(RolesEnum.USER)
  // @Permissions(PermissionsEnum.GET)
  @CheckPermissions(PermissionsEnum.GET)
  @Query(() => User, { name: 'userById' })
  findById(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findById(id);
  }

  // @Permissions(PermissionsEnum.GET)
  @CheckPermissions(PermissionsEnum.GET)
  @Query(() => User, { name: 'userByName' })
  async getById(@Args('name', { type: () => String }) name: string) {
    return this.usersService.findByName(name);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }
}

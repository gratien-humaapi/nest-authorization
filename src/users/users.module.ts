import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Role } from 'src/roles/entities/role.entity';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [MikroOrmModule.forFeature([User, Role])],

  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}

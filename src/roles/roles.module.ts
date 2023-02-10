import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Role } from './entities/role.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Role])],
  providers: [RolesResolver, RolesService],
  exports: [RolesService],
})
export class RolesModule {}

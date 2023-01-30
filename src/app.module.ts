import { MikroORM } from '@mikro-orm/core';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesGuard } from './users/role.guard';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      debug: false,
      playground: false,
    }),
    MikroOrmModule.forRoot(),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private readonly orm: MikroORM) {}
  configure(consumer: MiddlewareConsumer) {
    /**
     * apply MikroOrmMiddleware for request scoping entity manager
     * @see https://mikro-orm.io/docs/usage-with-nestjs#request-scoping-when-using-graphql
     * @see https://github.com/briandiephuis/nestjs-realworld-example-app/blob/97c9427b4cfd1e863121090f59fb2e5b39cfbe8c/src/app.module.ts#L50
     * */
    consumer.apply(MikroOrmMiddleware).forRoutes('graphql');
  }
}

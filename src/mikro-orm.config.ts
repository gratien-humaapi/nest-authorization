/* eslint-disable prettier/prettier */
import { LoadStrategy, Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

const MikroOrmConfig: Options = {
  // allowGlobalContext: true,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  // db config
  type: 'sqlite',
  dbName: 'database.db',
  // db config
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
  loadStrategy: LoadStrategy.JOINED,
  highlighter: new SqlHighlighter(),
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
    snapshot: false, // change to "true" after dev iteration
  },
  // seeder
  seeder: {
    path: 'dist/seeder',
    pathTs: 'src/seeder',
    // defaultSeeder: "DatabaseSeeder",
    glob: '*.{js,ts}',
    emit: 'ts',
    fileName: (className: string) => className,
  },
};

export default MikroOrmConfig;

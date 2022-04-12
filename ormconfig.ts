import { ConnectionOptions } from 'typeorm';

let ormconfig: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: ['src/**/*.subscriber.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'src/database/subscribers',
  },
  logger: 'advanced-console',
  logging: ['warn', 'error'],
};

export default ormconfig;

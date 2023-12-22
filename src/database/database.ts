import { DataSource, DataSourceOptions } from 'typeorm';

require('dotenv').config();

const PG_USER_NAME = process.env.PG_USER_NAME;
const PG_TABLE_NAME = process.env.PG_TABLE_NAME;
const PG_PASSWORD = process.env.PG_PASSWORD;

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    username: PG_USER_NAME,
    password: PG_PASSWORD,
    database: PG_TABLE_NAME,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/database/migrations/*{.ts,.js}'],
    synchronize: true,
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
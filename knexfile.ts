import Knex from 'knex';
import config from './config';

export default {
    migrations: {
        extension: 'ts',
    },
    development: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: './dev.sqlite3',
        },
    },
    production: {
        client: 'postgresql',
        connection: config.db.connection_string,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
} as { [key: string]: Knex.Config };

import type { Knex } from "knex";
import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config();

const {
    DB_PORT,
    DB_URL,
} = process.env;

let port_db = 6543;

if (DB_PORT) port_db = parseInt(DB_PORT);

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        pool: {
            min: 0,
            max: 5,
            idleTimeoutMillis: 10000,
        },
        connection: DB_URL,
        migrations: {
            tableName: 'knex_migrations',
            directory: resolve(__dirname, 'migrations'),
        },
    }
};

export default config;

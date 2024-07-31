import type { Knex } from "knex";
import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config();

const {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASS,
    DB_NAME,
    DB_URL,
} = process.env;

let port_db = 6543;

if (DB_PORT) port_db = parseInt(DB_PORT);
console.log(DB_HOST, DB_NAME, DB_PORT, DB_USER, DB_PASS);
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

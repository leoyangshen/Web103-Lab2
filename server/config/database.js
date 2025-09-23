import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
// Set a default value for NODE_ENV
const ENV = process.env.NODE_ENV || 'development';
console.log(ENV);
console.log('Connecting to database:', process.env.PGDATABASE);
// Define a common configuration object
const config = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
};

// Conditionally add SSL configuration
if (ENV === "production") {
    config.ssl = {
        rejectUnauthorized: false
    };
} else {
    config.ssl = false;
}

export const pool = new pg.Pool(config);

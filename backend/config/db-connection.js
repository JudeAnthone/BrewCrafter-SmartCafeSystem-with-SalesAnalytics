// this is where we connect to the database. Loads environment variables from the .env files. 
require ('dotenv').config();

const { Pool } = require('pg'); // node-postgres library
 
const pool = new Pool ({
   user: process.env.DB_USER, 
   host: process.env.DB_HOST,
   database: process.env.DB_NAME,
   password: process.env.DB_PASSWORD,
   port: process.env.DB_PORT
});

pool.connect((err, client, release) =>{
    if (err){
      console.error('Error connecting to PgSQL database:', err.stack);
    } else {
      console.log('Connected to PgSQL')
      release();
    }
});

module.exports = pool;

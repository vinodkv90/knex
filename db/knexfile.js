const path = require('path');

// Update with your config settings.
const dotenv = require('dotenv');
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: process.env.DB_CLIENT || 'postgresql',
    connection: {
      host:     process.env.DB_HOST,  
      database: process.env.DB_NAME || 'your_database_name',
      user:     process.env.DB_USER || 'your_database_user',
      password: process.env.DB_PASSWORD || 'your_database_password',
      port:     process.env.DB_PORT || 5433,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: process.env.DB_CLIENT || 'postgresql',
    connection: {
      database: process.env.DB_NAME || 'my_db',
      user:     process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'root'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

const express = require('express');
const router = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Database connection configuration
const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'your_database_user',
    password: 'your_database_password',
    database: 'your_database_name'
  }
});
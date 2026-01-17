const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./routes/auth');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const app = express();
const port = 8080;

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));

// Debug middleware
app.use((req, res, next) => {
  console.log('Method:', req.method);
  console.log('Content-Type:', req.get('content-type'));
  console.log('Body:', req.body);
  next();
});

app.use('/api/auth', router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

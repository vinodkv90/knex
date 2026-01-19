const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const homeRouter = require('./routes/home');
const path = require('path');
const dotenv = require('dotenv');
const cors = require("cors");

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const app = express();
const port = 8080;

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // allow all origins

// Debug middleware
app.use((req, res, next) => {
  console.log('Method:', req.method);
  console.log('Content-Type:', req.get('content-type'));
  console.log('Body:', req.body);
  next();
});

app.use('/api/auth', authRouter);
app.use('/api/home', homeRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

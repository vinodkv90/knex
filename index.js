const express = require('express');
const router = require('./routes');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware
app.use((req, res, next) => {
  console.log('Method:', req.method);
  console.log('Content-Type:', req.get('content-type'));
  console.log('Body:', req.body);
  next();
});

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

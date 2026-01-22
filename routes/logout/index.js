const express = require('express');
const authMiddleware = require('../../middlewares/auth');

const router = express.Router();
router.post('/me', (req, res) => {
  res.clearCookie('session', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    signed: true
  });
});

module.exports = router;
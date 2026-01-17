const { verifyToken } = require('../utils/jwt');

module.exports = (req, res, next) => {
  // const authHeader = req.headers.authorization;

  // if (!authHeader || !authHeader.startsWith('Bearer ')) {
  //   return res.status(401).json({ error: 'Unauthorized' });
  // }

  // const token = authHeader.split(' ').pop();

  // try {
  //   req.user = verifyToken(token);
  //   next();
  // } catch {
  //   res.status(401).json({ error: 'Invalid token' });
  // }


  const session = req.signedCookies.session;

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const data = JSON.parse(session);

    // Optional expiry check
    const MAX_AGE = 24 * 60 * 60 * 1000;
    if (Date.now() - data.issuedAt > MAX_AGE) {
      return res.status(401).json({ error: 'Session expired' });
    }

    req.user = { id: data.id };
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid session' });
  }
};

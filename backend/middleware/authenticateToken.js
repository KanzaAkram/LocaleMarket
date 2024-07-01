const { verifyToken } = require('../utilities/auth');

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract Bearer token

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const decoded = verifyToken(token);
//   console.log(decoded); // Log decoded token
  if (!decoded) {
    return res.status(403).json({ message: 'Failed to authenticate token' });
  }

  req.user = decoded;
  next();
};

module.exports = authenticate;

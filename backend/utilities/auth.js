const jwt = require('jsonwebtoken');
const secret = 'Aliyaisagoodgirl'; // Use a secure secret for production

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };

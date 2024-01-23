const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key'; // Change this with a strong secret key

const createToken = (user) => {
  const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = { createToken, verifyToken };

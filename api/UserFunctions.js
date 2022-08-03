const jwt = require('jsonwebtoken');
const User = require('./models/User.js');

const secret = 'secret123';

const getUserFromToken = (token) => {
  const userInfo = jwt.verify(token, secret);
  return User.findById(userInfo.id);
};

module.exports = { getUserFromToken };

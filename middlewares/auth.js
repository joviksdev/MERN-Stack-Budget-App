const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const isToken = jwt.verify(token, config.get('secret'));

    req.id = isToken.user.id;

    next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ msg: 'Invalid token, access denied' });
  }
};

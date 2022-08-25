const { User } = require('../db/models');

module.exports = async function getUser(req, res, next) {
  const { userId } = req.session;
  const user = userId && (await User.findByPk(userId));
  res.locals.user = user;

  next();
};
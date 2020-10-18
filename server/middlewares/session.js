const Session = require('../models/Session');
const getAuthorizationToken = require('../utils/getAuthorizationToken');

module.exports = async function(ctx, next) {
  const token = getAuthorizationToken(ctx.request);
  if (!token) return next();

  const session = await Session.findOne({ token }).populate('user');

  if (!session) {
    ctx.throw(401, 'Неверный аутентификационный токен');
  }

  session.lastVisit = new Date();
  await session.save();
  
  ctx.user = session.user;
  return next();
};

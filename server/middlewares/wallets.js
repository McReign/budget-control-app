const Wallet = require('../models/Wallet');

module.exports = async function(ctx, next) {
  if (!ctx.user) return next();
  ctx.wallets = await Wallet.find({ users: ctx.user }).populate('users');
  return next();
};

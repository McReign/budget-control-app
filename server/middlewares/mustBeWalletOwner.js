module.exports = function(ctx, next) {
  const { walletId } = ctx.params;
  if (!(ctx.wallets || []).find(wallet => wallet.id === walletId)) {
    ctx.throw(403, 'Кошелек не принадлежит текущему пользователю');
  }

  return next();
};

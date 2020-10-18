const mapResponse = require('../mappers/response');
const { mapWallet } = require('../mappers/wallet');

module.exports = async function(ctx) {
    const { wallets, params, request } = ctx;
    const { walletId } = params;
    const { balance } = request.body;

    const wallet = wallets.find(wallet => wallet.id === walletId);

    wallet.balance = balance;
    wallet.isBalanceSet = true;
    wallet.save();

    ctx.body = mapResponse({ wallet: mapWallet(wallet) });
};
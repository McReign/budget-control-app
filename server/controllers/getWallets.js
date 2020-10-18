const mapResponse = require('../mappers/response');
const { mapWallet } = require('../mappers/wallet');

module.exports = async function(ctx) {
    ctx.body = mapResponse({ wallets: ctx.wallets.map(mapWallet) });
};
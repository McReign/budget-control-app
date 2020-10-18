const Operation = require('../models/Operation');
const mapOperation = require('../mappers/operation');
const mapResponse = require('../mappers/response');

module.exports = async function(ctx) {
    const { wallets, params } = ctx;
    const { walletId } = params;
    const wallet = wallets.find(wallet => wallet.id === walletId);

    const operations = await Operation.find({ wallet })
        .populate('user')
        .populate('wallet')
        .populate('category');

    ctx.body = mapResponse({ operations: operations.map(mapOperation) });
};
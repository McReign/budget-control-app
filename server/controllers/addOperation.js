const Operation = require('../models/Operation');
const Category = require('../models/Category');
const getOperationSign = require('../utils/getOperationSign');
const mapResponse = require('../mappers/response');
const mapOperation = require('../mappers/operation');

module.exports = async function(ctx) {
    const { wallets, user, params, request } = ctx;
    const { walletId } = params;
    const { type, amount, date, categoryId, note, tags } = request.body;

    const wallet = wallets.find(wallet => wallet.id === walletId);

    const category = await Category.findById(categoryId);

    const operation = new Operation({ type, amount, wallet, user, category, date, note, tags });

    wallet.balance = wallet.balance + (getOperationSign(type) * amount);
    user.activeWallet = wallet;

    // TODO Remake it with transaction
    await Promise.all([operation.save(), wallet.save(), user.save()]);

    ctx.body = mapResponse({ operation: mapOperation(operation) });
};
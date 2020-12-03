const Category = require('../models/Category');
const mapCategory = require('../mappers/category');
const mapResponse = require('../mappers/response');

module.exports = async function(ctx, next) {
    const { wallets, query } = ctx;
    const { walletId } = query;

    if (!walletId) {
        return next();
    }

    const wallet = wallets.find(wallet => wallet.id === walletId);

    const categories = await Category.find({
        $or: [
            { users: { $in: (wallet && wallet.users) || [] } },
            { users: { $exists: false } },
        ],
    });

    ctx.body = mapResponse({
        categories: categories.map(mapCategory),
    });
};
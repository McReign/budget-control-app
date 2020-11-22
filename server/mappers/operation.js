const mapCategory = require('../mappers/category');
const { mapWalletSimple } = require('../mappers/wallet');
const { mapUserSimple } = require('../mappers/user');

module.exports = function mapOperation(operation) {
    return operation ? {
        id: operation.id,
        type: operation.type,
        balance: operation.balance,
        amount: operation.amount,
        date: operation.date,
        note: operation.note,
        category: mapCategory(operation.category),
        wallet: mapWalletSimple(operation.wallet),
        user: mapUserSimple(operation.user),
    } : null;
};
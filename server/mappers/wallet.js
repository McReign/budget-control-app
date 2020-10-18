const { mapUserSimple } = require('../mappers/user');

module.exports.mapWallet = function mapWallet(wallet) {
    return wallet ? {
        id: wallet.id,
        balance: wallet.balance,
        isBalanceSet: wallet.isBalanceSet,
        users: wallet.users.map(mapUserSimple),
    } : null;
};

module.exports.mapWalletSimple = function mapWalletSimple(wallet) {
    return wallet ? {
        id: wallet.id,
        balance: wallet.balance,
    } : null;
};
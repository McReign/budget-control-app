module.exports.mapUser = function mapUser(user) {
    return user ? {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        activeWallet: user.activeWallet,
    } : null;
};

module.exports.mapUserSimple = function mapUserSimple(user) {
    return user ? {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
    } : null;
};
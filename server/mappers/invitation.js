const { mapWalletSimple } = require('../mappers/wallet');
const { mapUserSimple } = require('../mappers/user');

module.exports = function mapInvitation(invitation) {
    return invitation ? {
        id: invitation.id,
        title: invitation.title,
        wallet: mapWalletSimple(invitation.wallet),
        from: mapUserSimple(invitation.from),
        to: mapUserSimple(invitation.to),
    } : null;
};

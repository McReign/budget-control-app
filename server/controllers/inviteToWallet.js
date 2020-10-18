const User = require('../models/User');
const Invitation = require('../models/Invitation');
const createInvitation = require('../utils/createInvitation');
const mapResponse = require('../mappers/response');
const mapInvitation = require('../mappers/invitation');

module.exports = async function(ctx) {
    const { user, wallets, request, params } = ctx;
    const { toUserId } = request.body;
    const { walletId } = params;

    const wallet = wallets.find(wallet => wallet.id === walletId);
    const toUser = await User.findById(toUserId);

    if (!toUser) {
        ctx.throw(404, 'Приглашаемого пользователя не существует');
    }

    if (wallet.users.find(user => user.id === toUserId)) {
        ctx.throw(400, 'Пользователь уже в кошельке');
    }

    const existingInvitation = await Invitation.findOne({ wallet, to: toUser });

    if (existingInvitation) {
        ctx.throw(400, 'Пользователь уже приглашен');
    }

    const invitation = await createInvitation(wallet, toUser, user);

    ctx.body = mapResponse({ invitation: mapInvitation(invitation) });
};
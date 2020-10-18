const User = require('../models/User');
const createInviteNotification = require('../utils/createInviteNotification');
const mapResponse = require('../mappers/response');
const mapNotification = require('../mappers/notification');

module.exports = async function(ctx) {
    const { user, request, params } = ctx;
    const { toUserId } = request.body;
    const { walletId } = params;

    const toUser = await User.findById(toUserId);

    if (!toUser) {
        ctx.throw(404, 'Данного пользователя не существует');
    }

    const invitation = await createInviteNotification(walletId, toUser, user);

    ctx.body = mapResponse({ invitation: mapNotification(invitation) });
};
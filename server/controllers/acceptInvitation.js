const Notification = require('../models/Notification');
const Invitation = require('../models/Invitation');
const mapResponse = require('../mappers/response');

module.exports = async function(ctx) {
    const { invitationId } = ctx.params;

    const invitation = await Invitation.findById(invitationId)
        .populate('wallet')
        .populate('to')
        .populate('from');

    if(!invitation) {
        ctx.throw(404, 'Приглашения не найдено');
    }

    if (invitation.to.id !== ctx.user.id) {
        ctx.throw(403, 'Приглашение не принадлежит текущему пользователю');
    }

    if (invitation.wallet.users.includes(ctx.user.id)) {
        ctx.throw(400, 'Пользователь уже находится в данном кошельке');
    }

    const notification = await Notification.findOne({ content: invitation });

    invitation.wallet.users = [...invitation.wallet.users, ctx.user.id];

    await Promise.all([notification.remove(), invitation.remove(), invitation.wallet.save()]);

    ctx.body = mapResponse({ success: true });
};
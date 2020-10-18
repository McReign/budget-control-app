const Notification = require('../models/Notification');
const Invitation = require('../models/Invitation');
const mapResponse = require('../mappers/response');

module.exports = async function(ctx) {
    const { invitationId } = ctx.params;

    const invitation = await Invitation.findById(invitationId).populate('to').populate('from');

    if(!invitation) {
        ctx.throw(404, 'Приглашения не найдено');
    }

    if (!(invitation.to.id === ctx.user.id || invitation.from.id === ctx.user.id)) {
        ctx.throw(403, 'Приглашение не принадлежит текущему пользователю');
    }

    const notification = await Notification.findOne({ content: invitation });

    await Promise.all([notification.remove(), invitation.remove()]);

    ctx.body = mapResponse({ success: true });
};
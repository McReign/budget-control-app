const Session = require('../models/Session');
const mapResponse = require('../mappers/response');
const getAuthorizationToken = require('../utils/getAuthorizationToken');

module.exports = async function(ctx) {
    const token = getAuthorizationToken(ctx.request);
    await Session.findOneAndRemove({ token });

    ctx.body = mapResponse({ success: true });
};
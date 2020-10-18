const User = require('../models/User');
const { mapUserSimple } = require('../mappers/user');
const mapResponse = require('../mappers/response');

module.exports = async function(ctx) {
    const { search } = ctx.query;
    const searchRegExp = new RegExp(search, 'i');

    const users = await User.find({
        $or: [
            { email: searchRegExp },
            { displayName: searchRegExp },
        ],
    });

    ctx.body = mapResponse({ users: users.map(mapUserSimple) });
};
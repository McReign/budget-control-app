const uuid = require('uuid');
const Session = require('../models/Session');

module.exports = async function(user) {
    const token = uuid.v4();
    await Session.create({ token, user, lastVisit: new Date() });
    return token;
};
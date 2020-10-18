const User = require('../models/User');
const Wallet = require('../models/Wallet');
const mapResponse = require('../mappers/response');
const createSession = require('../utils/createSession');

module.exports = async function(ctx) {
    const { email, displayName, password } = ctx.request.body;

    const user = new User({ email, displayName });
    await user.setPassword(password);

    user.activeWallet = await Wallet.create({ users: [user] });
    await user.save();

    const token = await createSession(user);

    ctx.body = mapResponse({ token });
};
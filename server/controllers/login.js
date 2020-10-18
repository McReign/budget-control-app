const User = require('../models/User');
const mapResponse = require('../mappers/response');
const createSession = require('../utils/createSession');

module.exports = async function(ctx) {
    const { email, password } = ctx.request.body;

    const user = await User.findOne({ email });
    if (!user) {
        ctx.throw(404, 'Нет такого пользователя');
    }

    const isPasswordValid = await user.checkPassword(password);

    if (!isPasswordValid) {
        ctx.throw(404, 'Невереный пароль');
    }

    const token = await createSession(user);

    ctx.body = mapResponse({ token });
};
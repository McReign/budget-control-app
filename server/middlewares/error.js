const mapResponse = require('../mappers/response');

module.exports = async function(ctx, next) {
    try {
        await next();
    } catch (err) {
        if (err.status) {
            ctx.status = err.status;
            ctx.body = mapResponse(null, err.message);
        } else {
            console.error(err);
            ctx.status = 500;
            ctx.body = mapResponse(null, 'Internal server error');
        }
    }
};
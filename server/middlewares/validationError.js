const mapResponse = require('../mappers/response');

module.exports = async function(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (err.name !== 'ValidationError') throw err;

    ctx.status = 400;

    const errors = Object.keys(err.errors).reduce((acc, key) => ({
      ...acc,
      [key]: err.errors[key].message,
    }), {});

    ctx.body = mapResponse(null, errors);
  }
};

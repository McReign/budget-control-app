const mapResponse = require('../mappers/response');
const { mapUser } = require('../mappers/user');

module.exports = async function(ctx) {
  ctx.body = mapResponse(mapUser(ctx.user));
};

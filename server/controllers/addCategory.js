const slugify = require('slugify');
const Category = require('../models/Category');
const mapCategory = require('../mappers/category');
const mapResponse = require('../mappers/response');

module.exports = async function(ctx) {
    const { user, request } = ctx;
    const { displayName, type } = request.body;

    const slug = slugify(displayName, { lower: true });
    const typedSlug = `${slug}-${type.toLowerCase()}`;
    const category = await Category.create({ displayName, type, user, slug: typedSlug });

    ctx.body = mapResponse({ category: mapCategory(category) });
};
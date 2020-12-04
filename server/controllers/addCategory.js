const slugify = require('slugify');
const Category = require('../models/Category');
const mapCategory = require('../mappers/category');
const mapResponse = require('../mappers/response');

module.exports = async function(ctx) {
    const { user, request } = ctx;
    const { displayName, type } = request.body;

    const slug = slugify(displayName, { lower: true });
    const typedSlug = `${slug}-${type.toLowerCase()}`;

    const existedCategory = await Category.findOne({ slug: typedSlug }).populate('users');

    if (existedCategory && existedCategory.users && existedCategory.users.find(current => current.id === user.id)) {
        ctx.throw(400, 'Категория уже существует');
    } else if (existedCategory) {
        existedCategory.users = [...(existedCategory.users || []), user];
        await existedCategory.save();
        ctx.body = mapResponse({ category: mapCategory(existedCategory) });
    } else {
        const category = await Category.create({
            displayName,
            type,
            users: [user],
            slug: typedSlug,
        });

        ctx.body = mapResponse({ category: mapCategory(category) });
    }
};
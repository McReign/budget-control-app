const Category = require('../models/Category');
const mapCategory = require('../mappers/category');
const mapResponse = require('../mappers/response');

module.exports = async function(ctx) {
    const { user } = ctx;
    const categories = await Category.find({
        $or: [
            { user },
            { user: { $exists: false } },
        ],
    });

    ctx.body = mapResponse({
        categories: categories.map(mapCategory),
    });
};
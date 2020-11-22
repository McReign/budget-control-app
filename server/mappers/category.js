module.exports = function mapCategory(category) {
    return category ? {
        id: category.id,
        displayName: category.displayName,
        slug: category.slug,
        type: category.type,
    } : null;
};
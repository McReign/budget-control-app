module.exports = function mapCategory(category) {
    return category ? {
        id: category.id,
        displayName: category.displayName,
    } : null;
};
module.exports = function(request) {
    const authorization = request.get('Authorization');
    return (authorization || '').split(' ')[1];
};
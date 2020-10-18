const DEFAULT_ERROR_KEY = 'common';

function toErrorsObject(errors) {
    return typeof errors === 'object' ? errors : { [DEFAULT_ERROR_KEY]: errors };
}

module.exports = function mapResponse(data, errors) {
    return {
        data: data || null,
        errors: errors && toErrorsObject(errors) || null,
    };
};
const OperationType = require('../constants/operationType');

const operationTypeToSignConnector = {
    [OperationType.EXPENSE]: -1,
    [OperationType.INCOME]: 1,
};

module.exports = function (type) {
    return operationTypeToSignConnector[type];
};

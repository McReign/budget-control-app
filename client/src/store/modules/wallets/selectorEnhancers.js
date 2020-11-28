export const walletEnhancer = (wallets) => (walletId) => {
    return wallets.find(wallet => wallet.id === walletId);
};

export const walletUsersEnhancer = (wallet) => {
    return wallet?.users || [];
};

export const walletBalanceEnhancer = (wallet) => {
    return wallet?.balance;
};

export const walletIncomesEnhancer = (operations) => {
    return operations.filter(operation => operation.type === 'INCOME');
};

export const walletExpensesEnhancer = (operations) => {
    return operations.filter(operation => operation.type === 'EXPENSE');
};

export const walletCategorizedOperationsEnhancer = (operations) => {
    return operations.reduce((acc, operation) => ({
        ...acc,
        [operation.category.displayName]: [...(acc[operation.category.displayName] || []), operation],
    }), {});
};

export const walletUsedCategoriesEnhancer = (operations) => {
    return Object.keys(walletCategorizedOperationsEnhancer(operations));
};

export const walletOperationsSumEnhancer = (operations) => {
    return operations.reduce((acc, operation) => acc + operation.amount, 0);
};

export const walletUsedCategoriesSumsEnhancer = (operations) => {
    const categorizedOperations = walletCategorizedOperationsEnhancer(operations);
    return walletUsedCategoriesEnhancer(operations).reduce((acc, category) => ({
        ...acc,
        [category]: walletOperationsSumEnhancer(categorizedOperations[category]),
    }), {});
};

export const errorsSelector = (state) => {
    return state.walletsState.error;
};

export const isLoadingSelector = (state) => {
    return state.walletsState.loading;
};

export const walletsSelector = (state) => {
    return state.walletsState.wallets;
};

export const walletSelector = (state) => (walletId) => {
    return (state.walletsState.wallets || []).find(wallet => wallet.id === walletId);
};

export const walletBalanceSelector = (state) => (walletId) => {
    return walletSelector(state)(walletId)?.balance;
};

export const walletOperationsSelector = (state) => (walletId) => {
    return state.walletsState.operations?.[walletId] || [];
};

export const walletIncomesSelector = (state) => (walletId) => {
    return walletOperationsSelector(state)(walletId).filter(operation => operation.type === 'INCOME');
};

export const walletIncomesSumSelector = (state) => (walletId) => {
    return walletIncomesSelector(state)(walletId).reduce((acc, income) => acc + income.amount, 0);
};

export const walletExpensesSelector = (state) => (walletId) => {
    return walletOperationsSelector(state)(walletId).filter(operation => operation.type === 'EXPENSE');
};

export const walletExpensesSumSelector = (state) => (walletId) => {
    return walletExpensesSelector(state)(walletId).reduce((acc, income) => acc + income.amount, 0);
};

export const walletCategorizedOperationsSelector = (state) => (walletId) => (type) => {
    return (type === 'INCOME' ? walletIncomesSelector : walletExpensesSelector)(state)(walletId)
        .reduce((acc, operation) => ({
            ...acc,
            [operation.category.displayName]: [...(acc[operation.category.displayName] || []), operation],
        }), {});
};

export const walletUsedExpenseCategoriesSelector = (state) => (walletId) => {
    return Object.keys(walletCategorizedOperationsSelector(state)(walletId)('EXPENSE'));
};

export const walletUsedIncomeCategoriesSelector = (state) => (walletId) => {
    return Object.keys(walletCategorizedOperationsSelector(state)(walletId)('INCOME'));
};

export const walletUsedExpenseCategoriesSumsSelector = (state) => (walletId) => {
    const categorizedExpenses = walletCategorizedOperationsSelector(state)(walletId)('EXPENSE');
    return walletUsedExpenseCategoriesSelector(state)(walletId).reduce((acc, category) => ({
        ...acc,
        [category]: categorizedExpenses[category].reduce((acc, operation) => acc + operation.amount, 0),
    }), {});
};

export const walletUsedIncomeCategoriesSumsSelector = (state) => (walletId) => {
    const categorizedIncomes = walletCategorizedOperationsSelector(state)(walletId)('INCOME');
    return walletUsedIncomeCategoriesSelector(state)(walletId).reduce((acc, category) => ({
        ...acc,
        [category]: categorizedIncomes[category].reduce((acc, operation) => acc + operation.amount, 0),
    }), {});
};
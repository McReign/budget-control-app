import { uniqBy } from 'lodash';
import { toDisplayDate } from '../../../utils/toDisplayDate';

export const walletEnhancer = (wallets) => (walletId) => {
    return wallets.find(wallet => wallet.id === walletId);
};

export const walletUsersEnhancer = (wallet) => {
    return wallet?.users || [];
};

export const walletBalanceEnhancer = (wallet) => {
    return wallet?.balance;
};

export const walletOperationsByUserEnhancer = (operations) => (userId) => {
    return operations.filter(operation => operation?.user?.id === userId);
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
        [operation.category.slug]: [...(acc[operation.category.slug] || []), operation],
    }), {});
};

export const walletUsedCategoriesEnhancer = (operations) => {
    return uniqBy(operations.map(operation => operation.category), category => category.slug);
};

export const walletOperationsSumEnhancer = (operations) => {
    return operations.reduce((acc, operation) => acc + operation.amount, 0);
};

export const walletUsedCategoriesSumsEnhancer = (operations) => {
    const categorizedOperations = walletCategorizedOperationsEnhancer(operations);
    return Object.keys(categorizedOperations).reduce((acc, categorySlug) => ({
        ...acc,
        [categorySlug]: walletOperationsSumEnhancer(categorizedOperations[categorySlug]),
    }), {});
};

export const walletOperationsByPeriodEnhancer = (operations) => ([start, end]) => {
    return operations.filter(operation => {
        return new Date(operation.date) >= new Date(start) && new Date(operation.date) <= new Date(end);
    });
};

export const walletDatedOperations = (operations) => {
    return operations.reduce((acc, operation) => {
        const date = toDisplayDate(operation.date);
        return {
            ...acc,
            [date]: [...(acc[date] || []), operation],
        };
    }, {});
};


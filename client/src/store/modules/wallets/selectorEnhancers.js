import { uniq, uniqBy } from 'lodash';
import { toDisplayDate } from '../../../utils/toDisplayDate';

export const walletEnhancer = (wallets) => (walletId) => {
    return wallets.find(wallet => wallet.id === walletId);
};

export const walletUsersEnhancer = (wallet) => {
    return wallet?.users || [];
};

export const walletUserEnhancer = (users) => (userId) => {
    return users.find(user => user.id === userId);
};

export const walletBalanceEnhancer = (wallet) => {
    return wallet?.balance;
};

export const walletOperationsByUserEnhancer = (operations) => (userId) => {
    return operations.filter(operation => operation?.user?.id === userId);
};

export const walletOperationsByUsersEnhancer = (operations) => (userIds) => {
    return operations.filter(operation => (userIds || []).includes(operation?.user?.id));
};

export const walletOperationsByTypeEnhancer = (operations) => (type) => {
    return operations.filter(operation => operation.type === type);
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
        [operation.category?.slug]: [...(acc[operation.category?.slug] || []), operation],
    }), {});
};

export const walletTaggedOperationsEnhancer = (operations) => {
    return operations.reduce((operationsAcc, operation) => ({
        ...operationsAcc,
        ...operation?.tags.reduce((tagsAcc, tag) => ({
            ...tagsAcc,
            [tag]: [...(operationsAcc[tag] || []), ...(tagsAcc[tag] || []), operation],
        }), {}),
    }), {});
};

export const walletUsedCategoriesEnhancer = (operations) => {
    return uniqBy(operations.map(operation => operation.category), category => category?.slug);
};

export const walletUsedTagsEnhancer = (operations) => {
    return uniq(operations.reduce((res, operation) => [...res, ...operation?.tags], []));
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

export const walletUsedTagsSumsEnhancer = (operations) => {
    const taggedOperations = walletTaggedOperationsEnhancer(operations);
    return Object.keys(taggedOperations).reduce((acc, tag) => ({
        ...acc,
        [tag]: walletOperationsSumEnhancer(taggedOperations[tag]),
    }), {});
};

export const walletOperationsByPeriodEnhancer = (operations) => ([start, end] = [null, null]) => {
    return operations.filter(operation => {
        return (!start || new Date(operation.date) >= new Date(start))
            && (!end || new Date(operation.date) <= new Date(end));
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


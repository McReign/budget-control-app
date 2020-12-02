export const SortDirection = {
    'ASC': 'ASC',
    'DESC': 'DESC',
};

export const sortArray = (array, getter, direction = SortDirection.DESC) => {
    return [...array].sort((first, second) => {
        const directionSign = direction === SortDirection.DESC ? -1 : 1;
        return directionSign * (getter(first) - getter(second));
    });
};

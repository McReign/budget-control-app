export const withNumberGroupSeparator = (number, separator) => {
    return `${number}`.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};
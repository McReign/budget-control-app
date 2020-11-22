import moment from 'moment';

export const toDisplayDate = (date) => {
    return moment(date).format('DD.MM.YYYY');
};
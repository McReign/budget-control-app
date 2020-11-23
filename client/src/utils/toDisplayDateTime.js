import moment from 'moment';

export const toDisplayDateTime = (date) => {
    return moment(date).format('DD.MM.YYYY HH:mm');
};
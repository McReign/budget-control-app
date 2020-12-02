import moment from 'moment';

export const DISPLAY_DATE_FORMAT = 'DD.MM.YYYY';

export const toDisplayDate = (date) => {
    return moment(date).format(DISPLAY_DATE_FORMAT);
};
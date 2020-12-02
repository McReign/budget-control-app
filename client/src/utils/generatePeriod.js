import moment from 'moment';
import { MONTHS_NAMES } from '../constants/months';

export const generatePeriod = (date) => {
    const start = moment(date).startOf('month').toISOString(true);
    const end = moment(date).endOf('month').toISOString(true);
    const year = moment(date).format('YYYY');
    const slug = moment(date).format('MMMM');
    const name = MONTHS_NAMES[slug];

    return { start, end, slug, name, year };
};

import './PeriodSlider.scss';
import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { Slider } from '../Slider/Slider';
import { Typography } from 'antd';

const MONTHS_NAMES = {
    'January': 'Январь',
    'February': 'Февраль',
    'March': 'Март',
    'April': 'Апрель',
    'May': 'Май',
    'June': 'Июнь',
    'July': 'Июль',
    'August': 'Август',
    'September': 'Сентябрь',
    'October': 'Октябрь',
    'November': 'Ноябрь',
    'December': 'Декабрь',
};

const MONTHS_COUNT = 24;
const CURRENT_MONTH_POSITION = (MONTHS_COUNT / 2) - 1;

const generatePeriod = (date) => {
    const start = moment(date).startOf('month').toISOString(true);
    const end = moment(date).endOf('month').toISOString(true);
    const year = moment(date).format('YYYY');
    const slug = moment(date).format('MMMM');
    const name = MONTHS_NAMES[slug];

    return { start, end, slug, name, year };
};

const generatePeriods = (basePeriod) => {
    return [...Array(MONTHS_COUNT)].map((_, index) => index - (MONTHS_COUNT / 2)).reduce((acc, index) => {
        const month = moment(basePeriod.start).add(index, 'months');
        const period = generatePeriod(month);
        return [...acc, period];
    }, []);
    // const prevMonth = moment(basePeriod.start).add(-1, 'months');
    // const nextMonth = moment(basePeriod.start).add(1, 'months');
    //
    // const prevPeriod = generatePeriod(prevMonth);
    // const nextPeriod = generatePeriod(nextMonth);
    //
    // const periods = [];
    //
    // periods[prevIndex] = prevPeriod;
    // periods[baseIndex] = basePeriod;
    // periods[nextIndex] = nextPeriod;
    //
    // return periods;
};

export const PeriodSlider = ({ onChange }) => {
    const [periods, setPeriods] = useState(generatePeriods(generatePeriod(new Date())));

    useEffect(() => {
        handleChange(CURRENT_MONTH_POSITION);
    }, [])

    const renderPeriodItem = useCallback((period) => {
        return (
            <div className='period-slider__period-wrapper'>
                <Typography.Text strong>
                    {period.name}
                    <Typography.Text type='secondary'>
                        ,&nbsp;{period.year}
                    </Typography.Text>
                </Typography.Text>
            </div>
        );
    }, []);

    const handleChange = useCallback((position) => {
        const period = periods[position];
        onChange && onChange([period.start, period.end]);
    }, [onChange]);

    return (
        <Slider
            className='period-slider'
            initialSlide={CURRENT_MONTH_POSITION}
            items={periods}
            renderItem={renderPeriodItem}
            afterChange={handleChange}
        />
    );
};

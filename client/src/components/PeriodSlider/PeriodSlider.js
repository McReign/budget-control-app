import './PeriodSlider.scss';
import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { Typography } from 'antd';
import { Slider } from '../Slider/Slider';
import { generatePeriod } from '../../utils/generatePeriod';

const MONTHS_COUNT = 24;
const CURRENT_MONTH_POSITION = MONTHS_COUNT / 2;

const generatePeriods = (basePeriod) => {
    return [...Array(MONTHS_COUNT)].map((_, index) => index - CURRENT_MONTH_POSITION).reduce((acc, index) => {
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

export const PeriodSlider = ({ selected, onChange }) => {
    const [periods, setPeriods] = useState(generatePeriods(generatePeriod(new Date())));

    const selectedIndex = periods.findIndex(period => {
        return period?.start === selected?.start && period?.end === selected?.end;
    });

    const initialSlide = selected && !!~selectedIndex ? selectedIndex : CURRENT_MONTH_POSITION;

    useEffect(() => {
        handleChange(initialSlide);
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
            initialSlide={initialSlide}
            items={periods}
            renderItem={renderPeriodItem}
            afterChange={handleChange}
        />
    );
};

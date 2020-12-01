import './Slider.scss';
import React from 'react';
import { Carousel } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import cn from 'classnames';

export const Slider = ({ className, items, renderItem, ...rest }) => {
    return (
        <Carousel
            className={cn('slider', className)}
            arrows
            dots={false}
            nextArrow={<RightOutlined />}
            prevArrow={<LeftOutlined />}
            {...rest}
        >
            {(items || []).map((item, index) => (
                <React.Fragment key={index}>{renderItem(item)}</React.Fragment>
            ))}
        </Carousel>
    );
};

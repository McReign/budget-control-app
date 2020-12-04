import './AddButtonRoundFixed.scss';
import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import cn from 'classnames';

export const AddButtonRoundFixed = (props) => {
    return (
        <Button
            {...props}
            className={cn('add-button-round-fixed', props.className)}
            type='primary'
            shape='circle'
            icon={<PlusOutlined />}
            size='large'
        />);
};
import './AddButtonDefault.scss';
import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import cn from 'classnames';

export const AddButtonDefault = (props) => {
    return (
        <Button
            {...props}
            className={cn('add-button-default', props.className)}
            type='primary'
            icon={<PlusOutlined />}
            size='middle'
        />);
};
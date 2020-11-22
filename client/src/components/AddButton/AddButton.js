import './AddButton.scss';
import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import cn from 'classnames';

export const AddButton = (props) => {
    return (
        <Button
            {...props}
            className={cn('add-button', props.className)}
            type='primary'
            shape='circle'
            icon={<PlusOutlined />}
            size='large'
        />);
};
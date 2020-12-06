import './AddButtonRoundFixed.scss';
import React from 'react';
import { createPortal } from 'react-dom';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import cn from 'classnames';

export const AddButtonRoundFixed = (props) => {
    return createPortal(
        <Button
            {...props}
            className={cn('add-button-round-fixed', props.className)}
            type='primary'
            shape='circle'
            icon={<PlusOutlined />}
            size='large'
        />,
        document.getElementById('root'),
    );
};
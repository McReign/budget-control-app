import './FullLoader.scss';
import React from 'react';
import { Spin } from 'antd';

export const FullLoader = () => {
    return (
        <div className='full-loader'>
            <Spin size='large' />
        </div>
    );
};

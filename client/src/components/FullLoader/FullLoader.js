import './FullLoader.scss';
import React from 'react';
import { Spin } from 'antd';

export const FullLoader = ({ delay }) => {
    return (
        <div className='full-loader'>
            <Spin size='large' delay={delay} />
        </div>
    );
};

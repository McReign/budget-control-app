import React from 'react';
import { FullLoader } from '../FullLoader/FullLoader';
import { Result } from 'antd';

export const RequestStatus = {
    LOADING: 'LOADING',
    LOADED: 'LOADED',
    ERROR: 'ERROR',
};

export const RequestWrapper = ({ requestStatus, children }) => {
    if (requestStatus === RequestStatus.LOADING) {
        return <FullLoader delay={0} />;
    }

    if (requestStatus === RequestStatus.ERROR) {
        return (
            <Result
                status="error"
                title="Произошла ошибка"
                subTitle="Пожалуйста, повторите позже."
            />
        );
    }

    if (requestStatus === RequestStatus.LOADED) {
        return children;
    }

    return null;
};

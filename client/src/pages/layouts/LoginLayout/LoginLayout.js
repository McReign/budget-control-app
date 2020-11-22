import React from 'react';
import cn from 'classnames';
import { Layout } from 'antd';

import './LoginLayout.scss';

const { Content } = Layout;

export const LoginLayout = ({ children, className }) => {
    return (
        <Layout className={cn('login-layout', className)}>
            <Content className={'login-layout__content'}>{children}</Content>
        </Layout>
    );
};

import React from 'react';
import cn from 'classnames';
import { Layout } from 'antd';

import './MainLayout.scss';

const { Sider, Content } = Layout;

export const MainLayout = ({ className, sider, children }) => {
    return (
        <Layout className={cn('main-layout', className)}>
            <Sider className={'main-layout__sider'} width={300}>{sider}</Sider>
            <Content className={'main-layout__content'}>{children}</Content>
        </Layout>
    );
};

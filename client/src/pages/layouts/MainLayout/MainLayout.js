import React, { useState } from 'react';
import cn from 'classnames';
import { Layout } from 'antd';

import './MainLayout.scss';

const { Sider, Content } = Layout;

export const MainLayout = ({ className, leftSider: LeftSider, children }) => {
    const [siderCollapsed, setSiderCollapsed] = useState(true);

    const layoutClassNames = cn('main-layout', className);
    const contentLayoutClassNames = cn(
        'main-layout__content-layout',
        {
            'main-layout__content-layout_full': siderCollapsed,
        },
    );
    const layoutBackdropClassNames = cn(
        'main-layout__backdrop',
        {
            'main-layout__backdrop_hidden': siderCollapsed,
        },
    );

    const handleCollapseSider = () => {
        if (siderCollapsed) return;
        setSiderCollapsed(true);
    };

    return (
        <Layout className={layoutClassNames}>
            <div className={layoutBackdropClassNames} onClick={handleCollapseSider} />
            <Sider
                className={'main-layout__sider'}
                width={300}
                collapsed={siderCollapsed}
                collapsedWidth={0}
                breakpoint='lg'
                zeroWidthTriggerStyle={{ bottom: 48, top: 'unset' }}
                onCollapse={setSiderCollapsed}
            >
                <LeftSider collapseSider={handleCollapseSider} />
            </Sider>
            <Layout className={contentLayoutClassNames}>
                <Content className='main-layout__content'>{children}</Content>
            </Layout>
        </Layout>
    );
};

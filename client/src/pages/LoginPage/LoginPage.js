import './LoginPage.scss';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Row, Col, Typography, Card, message, Tabs } from 'antd';
import { LoginLayout } from '../layouts/LoginLayout/LoginLayout';
import { EMPTY_FIELD_ERROR, ERROR_MESSAGE_DURATION } from '../../constants/errors';
import { getUser, loginUser, registerUser } from '../../store/modules/user/thunks';
import { isLoadingSelector } from '../../store/modules/user/selectors';

export const LoginPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const isLoading = useSelector(isLoadingSelector);

    const initialLoginValues = {
        remember: true,
    };

    const initialRegisterValues = {};

    const onLoginFinish = ({ email, password, remember }) => {
        dispatch(loginUser(email, password, remember))
            .then(() => dispatch(getUser()))
            .then((user) => history.push(`/wallets/${user?.activeWallet}`))
            .catch(errors => message.error(errors?.common, ERROR_MESSAGE_DURATION));
    };

    const onRegisterFinish = ({ email, displayName, password }) => {
        dispatch(registerUser(email, displayName, password))
            .then(() => history.push('/'))
            .catch(errors => message.error(errors?.common, ERROR_MESSAGE_DURATION));
    };

    const renderLoginForm = () => {
        return (
            <Card>
                <Form
                    layout="vertical"
                    initialValues={initialLoginValues}
                    onFinish={onLoginFinish}
                >
                    <Form.Item
                        label="Почтовый адрес"
                        name="email"
                        rules={[{ required: true, message: EMPTY_FIELD_ERROR }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[{ required: true, message: EMPTY_FIELD_ERROR }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item noStyle>
                        <Row justify='space-between' align='middle'>
                            <Col>
                                <Form.Item
                                    name="remember"
                                    valuePropName="checked"
                                    noStyle
                                >
                                    <Checkbox>Запомнить меня</Checkbox>
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item noStyle>
                                    <Button type="primary" htmlType="submit" loading={isLoading}>
                                        Подтвердить
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Card>
        );
    };

    const renderRegisterForm = () => {
        return (
            <Card>
                <Form
                    layout="vertical"
                    initialValues={initialRegisterValues}
                    onFinish={onRegisterFinish}
                >
                    <Form.Item
                        label="Почтовый адрес"
                        name="email"
                        rules={[{ required: true, message: EMPTY_FIELD_ERROR }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Ваше имя"
                        name="displayName"
                        rules={[{ required: true, message: EMPTY_FIELD_ERROR }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item noStyle>
                        <Row gutter={10}>
                            <Col span={12}>
                                <Form.Item
                                    label="Пароль"
                                    name="password"
                                    rules={[{ required: true, message: EMPTY_FIELD_ERROR }]}
                                >
                                    <Input.Password />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Подтверждение пароля"
                                    name="repeatedPassword"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        { required: true, message: EMPTY_FIELD_ERROR },
                                        ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject('Пароли должны совпадать!');
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item noStyle>
                        <Row justify='end' align='middle'>
                            <Col>
                                <Form.Item noStyle>
                                    <Button type="primary" htmlType="submit" loading={isLoading}>
                                        Подтвердить
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Card>
        );
    };

    const renderTabTitle = (title) => {
        return <Typography.Title className='login-page__tab-title'>{title}</Typography.Title>;
    };

    return (
        <LoginLayout className={'login-page'}>
            <Row>
                <Col offset={8} span={8}>
                    <Tabs className='login-page__tabs'>
                        <Tabs.TabPane
                            className='login-page__tab'
                            tab={renderTabTitle('Войти')}
                            key={'login'}
                        >
                            {renderLoginForm()}
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            className='login-page__tab'
                            tab={renderTabTitle('Регистрация')}
                            key={'register'}
                        >
                            {renderRegisterForm()}
                        </Tabs.TabPane>
                    </Tabs>
                </Col>
            </Row>
        </LoginLayout>
    );
};

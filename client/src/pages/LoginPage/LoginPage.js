import './LoginPage.scss';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Row, Col, Typography, Card, message } from 'antd';
import { LoginLayout } from '../layouts/LoginLayout/LoginLayout';
import { EMPTY_FIELD_ERROR, ERROR_MESSAGE_DURATION } from '../../constants/errors';
import { loginUser } from '../../store/modules/user/thunks';
import { isLoadingSelector } from '../../store/modules/user/selectors';

export const LoginPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const isLoading = useSelector(isLoadingSelector);

    const initialValues = {
        remember: true,
    };

    const onFinish = ({ email, password, remember }) => {
        dispatch(loginUser(email, password, remember))
            .then(() => history.push('/'))
            .catch(errors => message.error(errors?.common, ERROR_MESSAGE_DURATION));
    };

    return (
        <LoginLayout className={'login-page'}>
            <Row>
                <Col offset={7} span={10}>
                    <Typography.Title>Войти</Typography.Title>
                    <Card>
                        <Form
                            layout="vertical"
                            initialValues={initialValues}
                            onFinish={onFinish}
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
                </Col>
            </Row>
        </LoginLayout>
    );
};

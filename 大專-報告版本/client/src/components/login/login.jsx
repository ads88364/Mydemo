import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Col, Row, Carousel } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Googlehayaku from '../google-login/Googlehayaku'
import AlertBox from '../product-item/AlertBox';

// import Googlehayaku from '../google-login/Googlehayaku';  //google登入元件

import "./login.scss"

const Login = () => {
    const [account, setaccount] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(0);
    const [messenger, setMessenger] = useState('');
    const history = useNavigate();

    const onFinish = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                account: account,
                password: password
            });

            if (response.status === 200) {

                if (response.data.administratorok) {
                    // 管理者
                    console.log('管理者登入成功！')
                    const userInfo = `${account}`;
                    localStorage.setItem('userInfo', JSON.stringify(userInfo));
                    setMessenger("管理者登入");
                    setShowAlert(1);
                    setTimeout(() => {
                        window.location = "/Backstage"

                        setShowAlert(0);
                    }, 1000);
                } else {
                    console.log('ok');
                    const userInfo = `${account}`;
                    localStorage.setItem('userInfo', JSON.stringify(userInfo));
                    setMessenger("登入成功")
                    setShowAlert(1)
                    setTimeout(() => {
                        history("/")
                        window.location.reload();
                        setShowAlert(0);
                    }, 1000)
                }
            }

        } catch (error) {

            if (error.request.status === 401) {
                setMessenger("帳號或密碼錯誤 請重新輸入！")
                setShowAlert(2)
                setTimeout(() => { setShowAlert(0); }, 1000)
            } else if (error.request.status === 403) {
                setMessenger("帳號已被停權")
                setShowAlert(2)
                setTimeout(() => { setShowAlert(0); }, 1000)
            }
        }
    };

    return (

        <div id='loginout' >
        
            {showAlert === 1 && <AlertBox message={messenger} type="success" />}
            {showAlert === 2 && <AlertBox message={messenger} type="warning" />}
            {showAlert === 3 && <AlertBox message={messenger} type="warning" />}
            <Row id='login'>
                <Col span={15}>
                    <Carousel autoplay className='Carousel' style={{ height: "100%" }}>
                        <div>
                            <a href="http://localhost:3000/product"></a>
                            <img
                                src="http://localhost:8000/img/login/1.png"
                                alt="Carousel 1"
                            />
                        </div>
                        <div>
                            <a href="http://localhost:3000/product"></a>
                            <img
                                // style={contentStyle}
                                src="http://localhost:8000/img/login/2.png"
                                alt="Carousel 2"
                            />
                        </div>
                        <div>
                            <img
                                // style={contentStyle}
                                src="http://localhost:8000/img/login/3.png"
                                alt="Carousel 3"
                            />
                        </div>
                    </Carousel>
                </Col>
                <Col span={9} id='login-right'>
                    <p className='logintitle'>登入</p>
                    <Form
                        layout="vertical"
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}

                    >
                        <Form.Item
                            label="帳號"
                            name="account"
                            rules={[
                                {
                                    required: true,
                                    message: '請輸入帳號！',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="請輸入帳號"
                                size='large'
                                value={account}
                                onChange={e => setaccount(e.target.value)} // 更新用户名的状态
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="密碼"
                            rules={[
                                {
                                    required: true,
                                    message: '請輸入密碼！',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="請輸入密碼"
                                size='large'
                                value={password}
                                onChange={e => setPassword(e.target.value)} // 更新密码的状态
                            />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <div className='remember'>
                                <Checkbox>記住我</Checkbox>
                                <a href='/forget' className="login-form-forgot">忘記密碼嗎?</a>
                            </div>
                        </Form.Item>


                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                style={{ background: "#16778a", color: "#fff", width: "100%", height: "100%" }}
                            >
                                登入
                            </Button>


                        </Form.Item>
                        <div>快速登入</div><hr /><br />
                        <Googlehayaku /><br />
                    </Form>
                </Col>
            </Row>
            {/* <Googlehayaku />元件 */}
        </div>
    );
};

export default Login;

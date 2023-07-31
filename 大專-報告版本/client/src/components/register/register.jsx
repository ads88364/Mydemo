import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, Steps, Carousel, Col, Row, DatePicker, Select } from 'antd';
import "./register.scss"
import { Link } from 'react-router-dom';
import AlertBox from '../product-item/AlertBox';


const { Step } = Steps;


const Registration = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page1Data, setPage1Data] = useState({});
  const [page2Data, setPage2Data] = useState({});
  const [aldata, setaldata] = useState({})
  const [showAlert, setShowAlert] = useState(0);
  const [messenger, setMessenger] = useState('');



  useEffect(() => {
    if (currentStep === 2) {
      const allData = { ...page1Data, ...page2Data };
      setaldata(allData)
    }
  }, [currentStep, page1Data, page2Data]);


  useEffect(() => {
    const postApi = async () => {
      await axios.post('http://localhost:8000/api/register', { aldata: aldata })
    }
    if (Object.keys(aldata).length !== 0) {
      postApi();
    }
  }, [aldata]);
  // console.log(aldata)
  const handleNext = async (values) => {
    // console.log(values.username);

    if (values.username) {
      try {
        await axios.post('http://localhost:8000/api/register/account', { username: values.username });
        await form.validateFields(); // 驗證表單數據
        setPage1Data(values);
        setCurrentStep(currentStep + 1);

      } catch (error) {
        console.log('請求發生錯誤:', error);
        setMessenger("帳號重複")
        setShowAlert(1)
      } setTimeout(() => {
        setShowAlert(0);
      }, 1000)
    }
  };


  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = async (values) => {
    const { identityCard, email, phoneNumber } = values;

    if (identityCard && email && phoneNumber) {
      try {
        // 向後端發送一個包含所有字段的請求，同時驗證身分證、email和手機號碼是否重複
        await axios.post('http://localhost:8000/api/register/validate', {
          identityCard,
          email,
          phoneNumber,
        });
        await form.validateFields(); // 驗證表單數據
        setLoading(true);
        setPage2Data(values);
        setCurrentStep(2);

      } catch (error) {
        const err = error.response.data.duplicateData
        if (err) {
          const mass = Object.values(err).join('\n')
          // alert(mass)
          setMessenger(mass)

          setShowAlert(2)
          setTimeout(() => {
            setShowAlert(0);
          }, 1000)
        }
      }
    };
  }
  const registerchange = () => { };

  return (
    <div id='registerout'>
      {showAlert === 1 && <AlertBox message={messenger} type="warning" />}
      {showAlert === 2 && <AlertBox message={messenger} type="warning" />}
      <Row id='register' gutter={20} >

        <Col span={15}>
          <Carousel autoplay className='Carousel' style={{ height: "100%" }}>
            <div>
              <img
                // style={contentStyle}
                src="http://localhost:8000/img/login/1.png"
                alt="Carousel 1"
              />
            </div>
            <div>
              <a href="http://localhost:3000/product">
                <img
                  // style={contentStyle}
                  src="http://localhost:8000/img/login/2.png"
                  alt="Carousel 2"
                />
              </a>
            </div>
            <div>
              <a href="http://localhost:3000/product">
                <img
                  // style={contentStyle}
                  src="http://localhost:8000/img/login/3.png"
                  alt="Carousel 3"
                />
              </a>
            </div>
          </Carousel>
        </Col>

        <Col span={9} >
          <div className='reginertitle'>註冊</div>
          <Steps current={currentStep} className='col-10'
            style={{ paddingLeft: '30px' }}>
            <Step title="帳號密碼" />
            <Step title="個人資訊" />
            <Step title="完成註冊" />
          </Steps>
          {currentStep === 0 && (


            <Form form={form} layout="vertical"
              onFinish={handleNext}
              style={{}} >
              <Form.Item

                label="帳號"
                name="username"

                rules={[
                  { required: true, message: '請輸入帳號' },
                  {
                    pattern: /^[a-zA-Z0-9_-]{4,12}$/,
                    message: '帳號必須由4到12個字母、數字、下劃線或破折號組成',
                  },
                ]}
              >
                <Input size='large' prefix={<UserOutlined />}
                  placeholder="帳號必須由4到12個字母、數字、下劃線或破折號組成"
                  maxLength={12}
                  minLength={4} />
              </Form.Item>

              <Form.Item
                label="密碼"
                name="password"

                rules={[
                  { required: true, message: '請輸入密碼' },
                  { min: 6, message: '密碼至少需要6個字符' },

                ]}
              >
                <Input.Password size='large' prefix={<LockOutlined />}
                  placeholder="密碼至少需要6個字符" />
              </Form.Item>

              <Form.Item
                label="再次輸入密碼"
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: '請再次輸入密碼' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('兩次輸入的密碼不一致'));
                    },
                  }),
                ]}
              >
                <Input.Password size='large' prefix={<LockOutlined />}
                  placeholder="再次輸入密碼" />
              </Form.Item>

              <Form.Item>
                <Button htmlType="submit" onClick={registerchange}>
                  下一步
                </Button>
              </Form.Item>
            </Form>

          )}

          {currentStep === 1 && (
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFinish}
              size="large"
              style={{ marginTop: '20px' }}
              id='loginform2'

            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="姓名"
                    name="name"
                    rules={[{ required: true, message: '請輸入姓名' }]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="暱稱"
                    name="nickname"
                    rules={[{ required: true, message: '請輸入暱稱' }]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="生日"
                    name="birthday"
                    rules={[{ required: true, message: '請輸入生日' }]}

                  >
                    <DatePicker style={{ width: '100%' }} />

                  </Form.Item>

                </Col>
                <Col span={12}>
                  <Form.Item
                    label="性別"
                    name="gender"
                    rules={[{ required: true, message: '請選擇性別' }]}
                  >
                    <Select size="large">
                      <Select.Option value="1">男</Select.Option>
                      <Select.Option value="2">女</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row >

              <Form.Item
                label="身分證"
                name="identityCard"
                rules={[
                  { required: true, message: '請輸入身分證號碼' },
                  {
                    pattern: /^[A-Z]{1}[1-2]{1}[0-9]{8}$/,
                    message: '身分證格式不正確',
                  },
                ]}

              >
                <Input size='large'
                  maxLength={10} />
              </Form.Item>

              <Form.Item
                label="手機"
                name="phoneNumber"
                rules={[{ required: true, message: '請輸入手機號碼' }]}
              >
                <Input size='large'
                  maxLength={10} />
              </Form.Item>

              <Form.Item
                label="電子信箱"
                name="email"
                rules={[
                  { required: true, message: '請輸入電子信箱' },
                  { type: 'email', message: '請輸入有效的電子信箱' },
                ]}
              >
                <Input size='large' />
              </Form.Item>

              <Form.Item>
                <Button type="default" onClick={handlePrev}>
                  上一步
                </Button>
                <Button style={{ background: "#16778a", color: "#fff", width: "75%", marginLeft: "20px" }}
                  htmlType="submit"
                  loading={loading}>
                  註冊
                </Button>
              </Form.Item>
            </Form>

          )}
          {currentStep === 2 && (
            <div>
              <p style={{ marginLeft: "30px", fontSize: "2rem", fontWeight: "bolder" }}>註冊已完成！</p>
              <Link to='/login' type="primary" style={{ marginLeft: "30px", fontSize: "1.5rem" }}>
                立即登入
              </Link>
            </div>
          )}
        </Col>
      </Row>
    </div>

  );
};

export default Registration;

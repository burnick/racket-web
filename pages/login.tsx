import React, { useCallback, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Button, Form, Input, message } from 'antd';
import PanelCard from 'components/PanelCard';
import { SendEmailService } from 'hooks/useSendEmailService';

const { Item } = Form;
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate, isLoading, isSuccess, isError } = SendEmailService();
  const email = Form.useWatch('email', form);

  const onFinish = useCallback(
    (values: { email: string; remember: boolean }) => {
      mutate(values.email);
    },
    [mutate]
  );

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo);
  };

  const handleReset = useCallback(() => {
    form.resetFields();
  }, [form]);

  useEffect(() => {
    if (isLoading) {
      messageApi.open({
        type: 'success',
        content: 'Please wait sending create user request',
        duration: 2,
      });
    }

    return () => {
      message.destroy();
    };
  }, [isLoading, messageApi]);

  useEffect(() => {
    if (isError) {
      messageApi.open({
        type: 'error',
        content: 'Unable to send login',
        duration: 10,
      });
    }
    return () => {
      message.destroy();
    };
  }, [isError, messageApi]);

  return (
    <>
      {contextHolder}
      <Container>
        <Head>
          <title>Racket.ph Login</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta property="og:title" content="Racket.ph" key="title" />
        </Head>
        <PanelCard title="Login">
          {isSuccess && <>Please check your email</>}

          {!isSuccess && (
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              form={form}
            >
              <StyledItem
                label="Email"
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  { required: true, message: 'Please input your email!' },
                ]}
              >
                <Input disabled={isLoading} />
              </StyledItem>

              {/* <StyledItem
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </StyledItem> */}

              <ButtonsContainer {...tailLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!email || isLoading}
                >
                  Submit
                </Button>

                <Button htmlType="button" onClick={handleReset}>
                  Reset
                </Button>
              </ButtonsContainer>
            </Form>
          )}
        </PanelCard>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #fff;
`;

const StyledItem = styled(Item)``;

const ButtonsContainer = styled(Item)`
  .ant-form-item-control-input-content {
    display: flex;
    margin-left: -20%;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
  }
`;

export default Login;

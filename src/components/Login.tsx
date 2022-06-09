import { useState } from "react";
import { Form, Input, Checkbox, Button, Alert } from "antd";

import { login } from "../axios/login";
import { useAuth } from "../context/Auth";
import Spinner from "./Spinner";

interface FormProps {
  username: string;
  password: string;
}

function Login() {
  const { autoLogout } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: FormProps) => {
    setIsLoading(true);
    const { token, lifetime, error } = await login(
      values.password,
      values.password
    );
    if (token && lifetime) {
      return autoLogout(token, Date.now() + lifetime);
    }
    if (error) setErrorMessage(error.message);

    setIsLoading(false);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Form
      className="login-container"
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item wrapperCol={{ offset: 8 }}>
        {errorMessage && (
          <Alert showIcon={false} banner message={errorMessage} type="error" />
        )}
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Login;

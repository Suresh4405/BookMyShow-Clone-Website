import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import "./register.css";
import { RegisterUser } from "../Apicalls/users";
import { Link } from "react-router-dom";
import vv from "../../assets/The Drive - 1 Hour Version - 4K 60fps.mp4"

const onFinish = async (values) => {

  try {
    const response = await RegisterUser(values);
    if (response.success) {
      message.success(response.message);
      console.log(response.message);
    } else {
      message.error(response.message);
    }
    
  } catch (error) {
    console.log(error, "error in Register front end");
  }
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Register = () => (

  <div className="landing-page">
  <video className="bannerVideo" autoPlay muted loop>
      <source src={vv} type="video/mp4" /></video>
  
  <div className="form-container">
    <Form
      name="basic"
      labelCol={{
        span: 7,
      }}
      wrapperCol={{
        span: 25,
      }}
      style={{
       width: 350,
        border: "2px solid white",
        borderRadius: "8px",
        background:"white",
        opacity:".8",
        padding: "30px",
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <h1 className="Regst">Register</h1>

      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
          {
            type: "email",
            message: "Please enter a valid email address!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox style={{marginRight:"62px"}}>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 10,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" style={{marginRight:"72px",textAlign:"center"}}>
          Register
        </Button>
      </Form.Item>
      <Link to="/login" className="text-primary">
        {""}
        Already have an account? Login
      </Link>
    </Form>
  </div>
  </div>
);

export default Register;

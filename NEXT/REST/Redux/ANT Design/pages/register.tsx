import {useState,useEffect} from 'react'
import { User } from '../types/user.type';
import authService from '../api/authService'
import { useRouter } from 'next/router'
import React from 'react';
import styles from '../styles/Home.module.css'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { register , reset } from '../features/authSlice/auth.slice';

import { Button, Checkbox, Form, Input } from 'antd';

const registerForm: React.FC = () => {

  const [fields,setFields] = useState({
    name: '',
    email:'',
    password: ''
  }) 

  const [error,setError] = useState('')

  const dispatch= useAppDispatch()
  const {user, isLoading , isError, message} = useAppSelector((state) => state.auth)
  const router = useRouter()

  useEffect(() =>  {
    if(isError) {
      setError(message)
    }

    if(user) {
      router.push('/')
      window.location.reload();
    }
    dispatch(reset())
  },[user, isError,  message, router, dispatch])

  const onChange =  (event:any) =>{
    setFields({...fields, [event.target.name] : event.target.value});
  }

  const handleRegister = async (e :any) => {
    e.preventDefault();

    const user : User = {
      name: fields.name as string,
      email: fields.email as string,
      password: fields.password as string
    }

    dispatch(register(user))
  };

  const onFinish = async (values:any) => {
    console.log(values)
    dispatch(register(values))
  }

  const onFinishFailed = async (values:any) => {

  }

  return (
    <>
<Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={styles.form}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
        className={styles.formGroup}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
        className={styles.formGroup}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        className={styles.formGroup}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }} className={styles.submitBtn}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <Form.Item>
        {error}
      </Form.Item>
    </Form>
    </>
  );
};

export default registerForm;
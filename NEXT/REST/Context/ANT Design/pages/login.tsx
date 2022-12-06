import { User } from '../types/user.type';
import {useState,useEffect} from 'react';
import React from 'react';
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/AuthContext';
import authService from '../api/authService'


import { Button, Checkbox, Form, Input } from 'antd';
import styles from '../styles/Home.module.css'

const loginForm: React.FC = () => {

  const [fields,setFields] = useState({
    email:'',
    password: ''
  }) 

  const {setUserStore,setError,reset,isError,errorMessage,isLoggedIn} = useAuth()
  const router = useRouter()

  useEffect(() => {
    if(isError) {
      setError(errorMessage)
      console.log(errorMessage)
    }
    if(isLoggedIn) {
      router.push('/')
      window.location.reload()
    }
    reset()
  },[isLoggedIn])


  const onChange =  (event:any) =>{
    setFields({...fields, [event.target.name] : event.target.value});
    setError('') // set error state to empty
  }

  const handleLogin = async (e :any) => {
    e.preventDefault();

    const user : User = {
      email: fields.email as string,
      password: fields.password as string
    }
    try {
      const response = await authService.login(user)
        setUserStore({name:response.name})
        console.log(isLoggedIn)

    } catch (error : any) {
      const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong'
      setError(message)
    }

  };

  const onFinish = async (values:any) => {
    console.log(values)
    try {
      const response = await authService.login(values)
        setUserStore({name:response.name})
        console.log(isLoggedIn)

    } catch (error : any) {
      const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong'
      setError(message)
    }
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
            label="email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
            className={styles.formGroup}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            label="password"
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
            {errorMessage}
          </Form.Item>
        </Form>
        </>
  );
};

export default loginForm;
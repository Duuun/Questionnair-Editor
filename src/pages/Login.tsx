import React, { FC, useEffect } from 'react'
import styles from './Login.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input, Space, Typography, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { REGISTER_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'
import { loginService } from '../services/user'
import { useRequest } from 'ahooks'
import { setToken } from '../utils/user-token'

// 记住/ 忘记 /拿到 账号密码函数
const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

function deleteUser() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}
// 拿到
function getUser() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  }
}

const Login: FC = () => {
  const nav = useNavigate()
  const { Title } = Typography

  const [form] = Form.useForm() //第三方hook

  useEffect(() => {
    const { username, password } = getUser()
    form.setFieldsValue({ username, password })
  }, [])

  // 登录的异步
  const { run } = useRequest(
    async value => {
      const { username, password } = value
      const data = await loginService(username, password)
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { token = '' } = result
        // 存token -》localStory
        setToken(token)
        message.success('登录成功')
        nav(MANAGE_INDEX_PATHNAME) // 导航到“我的问卷”
      },
    }
  )

  const onFinish = (value: any) => {
    console.log(value)
    const { username, password, remember } = value || {}

    run(value) //执行ajax

    if (remember) {
      console.log('记住')
      rememberUser(username, password)
    } else {
      console.log('忘记')
      deleteUser()
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { type: 'string', min: 5, max: 10, message: '字符长度为5-10之间' },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login

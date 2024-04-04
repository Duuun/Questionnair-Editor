import React, { FC } from 'react'
import { Button, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { useRequest } from 'ahooks'
import { LOGIN_PATHNAME } from '../router'
// import { getUserInfoService } from '../services/user'
import { removeToken } from '../utils/user-token'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { logoutReducer } from '../store/userReducer'

import { getUserInfoService } from '../services/user'

const UserInfo: FC = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()

  // 不直接发送ajax
  // const { data } = useRequest(getUserInfoService) // ajax
  // const { username, nickname } = data || {}

  // 通过redux来拿
  const { username, nickname } = useGetUserInfo()

  function logout() {
    dispatch(logoutReducer()) //调用退出的reducer
    removeToken() // 清除 token 的存储
    message.success('退出成功')
    nav(LOGIN_PATHNAME)
  }

  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )

  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>

  return <div>{username ? UserInfo : Login}</div>
}

export default UserInfo

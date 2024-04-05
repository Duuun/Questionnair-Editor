import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'
import { Spin } from 'antd'

// 头、尾是固定内容，中间通过<Outlet/>来替换页面中的部分
const QuestionLayout: FC = () => {
  // 加载用户信息
  const { waitingUserData } = useLoadUserData()
  // 用户没有登录时，跳转登录页
  useNavPage(waitingUserData)

  return <div style={{ height: '100vh' }}>{!waitingUserData && <Outlet />}</div>
}

export default QuestionLayout

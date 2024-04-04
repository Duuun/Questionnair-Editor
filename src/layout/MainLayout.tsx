import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import styles from './MainLayout.module.scss'
import Logo from '../component/Logo'
import UserInfo from '../component/UserInfo'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'

const { Header, Footer, Content } = Layout

// 头、尾是固定内容，中间通过<Outlet/>来替换页面中的部分
const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData) //可跳转页面的判断

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      {/* 多包一层Layout，不然contant的高度不生效，Layout本质是一个section */}
      <Layout className={styles.main}>
        <Content>
          <div>{!waitingUserData && <Outlet />}</div>
        </Content>
      </Layout>

      <Footer className={styles.footer}>Fundly 问卷 &copy;2024-present. Created by Dunn</Footer>
    </Layout>
  )
}

export default MainLayout

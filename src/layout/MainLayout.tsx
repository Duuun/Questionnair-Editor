import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import styles from './MainLayout.module.scss'
import Logo from '../component/Logo'
import UserInfo from '../component/UserInfo'

const { Header, Footer, Content } = Layout

// 头、尾是固定内容，中间通过<Outlet/>来替换页面中的部分
const MainLayout: FC = () => {
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
          <Outlet />
        </Content>
      </Layout>

      <Footer className={styles.footer}>小慕问卷 &copy;2023-present. Created by Dunn</Footer>
    </Layout>
  )
}

export default MainLayout

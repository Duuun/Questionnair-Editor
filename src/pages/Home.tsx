import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { MANAGE_INDEX_PATHNAME } from '../router'
import styles from './Home.module.scss'

const Home: FC = () => {
  const nav = useNavigate()

  // function clickHandler() {
  //   nav({
  //     pathname: '/login',
  //     search: 'b=2',
  //   })
  // }

  const { Title, Paragraph } = Typography

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查</Title>
        <Paragraph>已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份</Paragraph>
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home

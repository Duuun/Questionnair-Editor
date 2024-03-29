import React, { FC } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button, Divider, Space } from 'antd'
import { BarsOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import { PlusOutlined, StarOutlined } from '@ant-design/icons'
import styles from './ManageLayout.module.scss'
import path from 'path'

// 头、尾是固定内容，中间通过<Outlet/>来替换页面中的部分
const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <p>ManageLayout left</p>
        <Space direction="vertical">
          <Button type="primary" size="large" icon={<PlusOutlined />}>
            新建问卷
          </Button>
          <Divider style={{ borderTop: 'transparent' }} />

          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => nav('/manage/list')}
          >
            我的问卷
          </Button>

          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => nav('/manage/star')}
          >
            星标问卷
          </Button>

          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => nav('/manage/trash')}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout

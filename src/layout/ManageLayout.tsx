import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './ManageLayout.module.scss'

// 头、尾是固定内容，中间通过<Outlet/>来替换页面中的部分
const ManageLayout: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <p>ManageLayout left</p>
        <button>创建问卷</button>
        <br />
        <button>我的问卷</button>
        <br />
        <button>星标问卷</button>
        <br />
        <button>回收站</button>
        <br />
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout

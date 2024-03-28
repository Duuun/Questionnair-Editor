import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

// 头、尾是固定内容，中间通过<Outlet/>来替换页面中的部分
const MainLayout: FC = () => {
  return (
    <>
      <div>MainLayout header</div>
      <div>
        <Outlet />
      </div>
      <div>MainLayout footer</div>
    </>
  )
}

export default MainLayout

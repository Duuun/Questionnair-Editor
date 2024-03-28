import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './ManageLayout.module.scss'

// 头、尾是固定内容，中间通过<Outlet/>来替换页面中的部分
const QuestionLayout: FC = () => {
  return (
    <div>
      <div>QuestionLayout left</div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default QuestionLayout

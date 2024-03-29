import React, { FC, useState } from 'react'
import QuestionCard from '../../component/QuestionCard'
import ListSearch from '../../component/ListSearch'

import { useTitle } from 'ahooks'
import { Typography, Empty } from 'antd'

import styles from './common.module.scss'

const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createAt: '3月10日 13.23',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createAt: '3月1日 13.23',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: true,
    answerCount: 2,
    createAt: '3月16日 12.23',
  },
]

const Star: FC = () => {
  useTitle('Fundly问卷 - 星标问卷')

  const [questionList, setQuestionList] = useState(rawQuestionList)
  const { Title } = Typography

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>

      {/* 问卷列表部分 */}
      <div className={styles.contain}>
        {questionList.length === 0 && <Empty description="暂无数据" />}

        {questionList.length > 0 &&
          questionList.map(q => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>

      <div className={styles.footer}>Star page footer：分页</div>
    </>
  )
}

export default Star

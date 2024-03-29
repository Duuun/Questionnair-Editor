import React, { FC, useState } from 'react'
import QuestionCard from '../../component/QuestionCard'
import { useTitle } from 'ahooks'
import { Typography } from 'antd'
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
    isStar: false,
    answerCount: 5,
    createAt: '3月1日 13.23',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: false,
    answerCount: 2,
    createAt: '3月16日 12.23',
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: true,
    isStar: false,
    answerCount: 7,
    createAt: '4月1日 13.43',
  },
]

const List: FC = () => {
  useTitle('Fundly问卷 - 我的问卷')
  const [questionList, setQuestionList] = useState(rawQuestionList)
  const { Title } = Typography

  return (
    <>
      {/* 头部 */}
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>

      {/* 问卷列表部分 */}
      <div className={styles.contain}>
        {questionList.length > 0 &&
          questionList.map(q => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>

      <div className={styles.footer}>load more footer：加载更多</div>
    </>
  )
}

export default List

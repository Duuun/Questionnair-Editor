import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import QuestionCard from '../component/QuestionCard'

const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: false,
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
  const [questionList, setQuestionList] = useState(rawQuestionList)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>搜索</div>
      </div>

      {/* 列表部分 */}
      <div className={styles.contain}>
        {questionList.map(q => {
          const { _id } = q
          return <QuestionCard key={_id} {...q} />
        })}
      </div>

      <div className={styles.footer}>footer</div>
    </>
  )
}

export default List

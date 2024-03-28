import React, { FC } from 'react'
import styles from './QuestionCard.module.scss'

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createAt: string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, isPublished, answerCount, createAt } = props

  return (
    <>
      <p>QuestionCard {_id}</p>

      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <a href="#">{title}</a>
          </div>
          <div className={styles.right}>
            {isPublished ? <span style={{ color: 'green' }}>已发布</span> : <span>未发布</span>}
            &nbsp;
            <span>答卷：{answerCount}</span>
            &nbsp;
            <span>{createAt}</span>
          </div>
        </div>

        <div className={styles['button-container']}>
          <div className={styles.left}>
            <button>编辑问卷</button>
            <button>统计数据</button>
          </div>
          <div className={styles.left}>
            <button>编辑问卷</button>
            <button>编辑问卷</button>
            <button>编辑问卷</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuestionCard

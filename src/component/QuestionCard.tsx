import React, { FC, useState } from 'react'
import { Button, Divider, Modal, Popconfirm, Space, Tag, message } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from '@ant-design/icons'

import { Link, useNavigate } from 'react-router-dom'
import { updateQuestionService, duplicateQuestionService } from '../services/question'
import { useRequest } from 'ahooks'
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
  const { _id, title, isPublished, answerCount, createAt, isStar } = props
  const nav = useNavigate()
  // 弹框确定删除
  const { confirm } = Modal

  // 修改 标星
  const [isStarState, setIsStarState] = useState(isStar)
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState) // 更新 state
        message.success('已更新')
      },
    }
  )

  // 复制
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    // async () => {
    //   const data = await duplicateQuestionService(_id)
    //   return data
    // },
    async () => await duplicateQuestionService(_id),
    {
      manual: true,
      onSuccess(result) {
        message.success('复制成功') // 只提示，不用选确定和取消
        nav(`/question/edit/${result.id}`) // 跳转到问卷编辑页
      },
    }
  )

  // 删除
  const [isDeletedState, setIsDeletedState] = useState(false)
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        setIsDeletedState(true)
      },
    }
  )

  // 确定删除弹框
  function del() {
    confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      onOk: deleteQuestion,
    })
  }

  // 已经删除的问卷，不渲染
  if (isDeletedState) return null

  return (
    <>
      <p>QuestionCard {_id}</p>

      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            {/* 点击标题跳转 */}
            <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
              <Space>
                {isStarState && <StarOutlined style={{ color: 'red' }} />} {title}
              </Space>
            </Link>
          </div>
          <div className={styles.right}>
            <Space>
              {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
              <span>答卷：{answerCount}</span>
              <span>{createAt}</span>
            </Space>
          </div>
        </div>
        {/* 分割线 */}
        <Divider style={{ margin: '12px 0' }} />
        <div className={styles['button-container']}>
          <div className={styles.left}>
            <Space>
              <Button
                icon={<EditOutlined />}
                type="text"
                size="small"
                onClick={() => nav(`/question/edit/${_id}`)}
              >
                编辑问卷
              </Button>
              <Button
                icon={<LineChartOutlined />}
                type="text"
                size="small"
                onClick={() => nav(`/question/stat/${_id}`)}
                disabled={!isPublished}
              >
                统计数据
              </Button>
            </Space>
          </div>
          <div className={styles.left}>
            <Space>
              <Button
                icon={<StarOutlined />}
                type="text"
                size="small"
                onClick={changeStar}
                disabled={changeStarLoading}
              >
                {isStarState ? '取消标星' : '标星'}
              </Button>
              <Popconfirm
                title="确定复制该问卷？"
                okText="确定"
                cancelText="取消"
                onConfirm={duplicate}
              >
                <Button
                  type="text"
                  icon={<CopyOutlined />}
                  size="small"
                  disabled={duplicateLoading}
                >
                  复制
                </Button>
              </Popconfirm>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                size="small"
                onClick={del}
                disabled={deleteLoading}
              >
                删除
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuestionCard

import React, { FC } from 'react'
import { Button, Divider, Modal, Popconfirm, Space, Tag, message } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from '@ant-design/icons'

import styles from './QuestionCard.module.scss'
import { Link, useNavigate } from 'react-router-dom'

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

  function duplicate() {
    // 只提示，不用选确定和取消
    message.success('复制成功')
  }

  function del() {
    confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      onOk: () => message.success('删除成功'),
    })
  }

  return (
    <>
      <p>QuestionCard {_id}</p>

      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            {/* 点击标题跳转 */}
            <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
              <Space>
                {isStar && <StarOutlined style={{ color: 'red' }} />} {title}
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
              <Button icon={<StarOutlined />} type="text" size="small">
                {isStar ? '取消标星' : '标星'}
              </Button>
              <Button icon={<CopyOutlined />} type="text" size="small" onClick={duplicate}>
                复制
              </Button>
              <Popconfirm title="确定删除该问卷？" okText="确定" cancelText="取消" onConfirm={del}>
                <Button icon={<DeleteOutlined />} type="text" size="small">
                  删除
                </Button>
              </Popconfirm>
            </Space>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuestionCard

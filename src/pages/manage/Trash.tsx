import React, { FC, useState } from 'react'
import QuestionCard from '../../component/QuestionCard'
import { useTitle } from 'ahooks'
import { Typography, Empty, Table, Tag, Space, Button, message, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import styles from './common.module.scss'

// 数据源
const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createAt: '3月10日 13:23',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createAt: '3月1日 13:23',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: false,
    answerCount: 2,
    createAt: '3月16日 12:23',
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: true,
    isStar: false,
    answerCount: 7,
    createAt: '4月1日 13:43',
  },
]

// 属性
const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    // key: 'title', //循环列的key，会默认取dataIndex的值，可以省略
  },
  {
    title: '发布状态',
    dataIndex: 'isPublished',
    render: (isPublished: boolean) => {
      return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
    },
  },
  {
    title: '答卷数量',
    dataIndex: 'answerCount',
  },
  {
    title: '创建日期',
    dataIndex: 'createAt',
  },
]

const Trash: FC = () => {
  useTitle('Fundly问卷 - 回收站')

  const { Title } = Typography
  const [questionList, setQuestionList] = useState(rawQuestionList)
  // 记录选中的id
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // 弹框确定删除
  const { confirm } = Modal

  // 确定删除函数
  function del() {
    confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      // 再次提示
      content: '删除以后不可以找回',
      onOk: () => message.warning(`删除 ${selectedIds}成功`),
    })
  }

  // 把Tablet和Button抽离出来
  const TableElem = (
    <>
      <Space style={{ marginBottom: '16px' }}>
        <Button type="primary" disabled={selectedIds.length === 0}>
          恢复
        </Button>

        <Button danger disabled={selectedIds.length === 0} onClick={del}>
          彻底删除
        </Button>
      </Space>
      <Table
        dataSource={questionList}
        columns={columns}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectedIds(selectedRowKeys as string[])
          },
        }}
      />
    </>
  )

  return (
    <>
      {/* 头部 */}
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>

      {/* 问卷列表部分 */}
      <div className={styles.contain}>
        {questionList.length === 0 && <Empty description="暂无数据" />}

        {questionList.length > 0 && TableElem}
      </div>

      <div className={styles.footer}>Trash page footer：分页</div>
    </>
  )
}

export default Trash

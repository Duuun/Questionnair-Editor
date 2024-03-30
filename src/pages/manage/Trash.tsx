import React, { FC, useState } from 'react'
import QuestionCard from '../../component/QuestionCard'
import { useTitle, useRequest } from 'ahooks'
import { Typography, Empty, Table, Tag, Space, Button, message, Modal, Spin } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import useQuestionListData from '../../hooks/useLoadQuestionListData'
import ListPage from '../../component/ListPage'
import { updateQuestionService, deleteQuestionsService } from '../../services/question'

import styles from './common.module.scss'
import ListSearch from '../../component/ListSearch'

// 数据源

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

  const { data = {}, loading, refresh } = useQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data

  const { Title } = Typography
  // 记录选中的id
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // 弹框确定删除
  const { confirm } = Modal

  // 恢复问卷
  const { run: recover } = useRequest(
    async () => {
      // 遍历数组执行异步函数
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500, // 防抖
      onSuccess() {
        message.success('恢复成功')
        refresh() // 手动刷新列表
        setSelectedIds([])
      },
    }
  )

  // 删除
  const { run: deleteQuestion } = useRequest(
    async () => await deleteQuestionsService(selectedIds),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        refresh()
        setSelectedIds([]) //重置选择的id
      },
    }
  )

  function del() {
    confirm({
      title: '确认彻底删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不可以找回',
      onOk: deleteQuestion,
    })
  }

  // 把Tablet和Button抽离出来
  const TableElem = (
    <>
      <Space style={{ marginBottom: '16px' }}>
        <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>
          恢复
        </Button>

        <Button danger disabled={selectedIds.length === 0} onClick={del}>
          彻底删除
        </Button>
      </Space>
      <Table
        dataSource={list}
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
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>

      {/* 问卷列表部分 */}
      <div className={styles.contain}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}

        {!loading && list.length === 0 && <Empty description="暂无数据" />}

        {list.length > 0 && TableElem}
      </div>

      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Trash

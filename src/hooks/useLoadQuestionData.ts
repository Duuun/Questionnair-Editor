import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'
import { useRequest } from 'ahooks'

// 获取单个问卷信息
function useLoadQuestionData() {
  // 也要loading控制
  // Effect中不能直接执行 getQuestionService

  const { id = '' } = useParams()

  async function load() {
    const data = await getQuestionService(id)
    return data
  }

  const { loading, data, error } = useRequest(load)

  return { loading, data, error }
}

export default useLoadQuestionData

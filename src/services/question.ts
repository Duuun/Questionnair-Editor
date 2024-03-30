import axios, { ResDateType } from './ajax'
// import type { ResDateType } from './ajax'

// 定义需要的参数
type SearchOption = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}

// 1. 获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDateType> {
  const url = `/api/question/:${id}`
  const data = (await axios.get(url)) as ResDateType
  return data
}

// 2. 创建问卷:ManageLayout中
export async function createQuestionService(): Promise<ResDateType> {
  const url = '/api/question'
  const data = (await axios.post(url)) as ResDateType
  return data
}

// 获取问卷列表
export async function getQuestionListService(
  opt: Partial<SearchOption> = {}
): Promise<ResDateType> {
  const url = '/api/question'
  const data = (await axios.get(url, { params: opt })) as ResDateType
  return data
}

// 更新单个问卷
export async function updateQuestionService(
  id: string,
  opt: { [key: string]: any }
): Promise<ResDateType> {
  const url = `/api/question/${id}`
  const data = (await axios.patch(url, opt)) as ResDateType
  return data
}

// 复制问卷
export async function duplicateQuestionService(id: string): Promise<ResDateType> {
  const url = `/api/question/duplicate/${id}`
  const data = (await axios.post(url)) as ResDateType
  return data
}

// 批量彻底删除
export async function deleteQuestionsService(ids: string[]): Promise<ResDateType> {
  const url = '/api/question'
  const data = (await axios.delete(url, { data: { ids } })) as ResDateType
  return data
}

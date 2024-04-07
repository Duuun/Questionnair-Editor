import axios, { ResDateType } from './ajax'

// 获取问卷的统计列表
export async function getQuestionStatListService(
  questionId: string,
  opt: { page: number; pageSize: number }
): Promise<ResDateType> {
  const url = `/api/stat/${questionId}`
  const data = (await axios.get(url, { params: opt })) as ResDateType
  return data
}

// 获取组件统计数据汇总
export async function getComponentStatService(
  questionId: string,
  componentId: string
): Promise<ResDateType> {
  const url = `/api/stat/${questionId}/${componentId}`
  const data = (await axios.get(url)) as ResDateType
  return data
}

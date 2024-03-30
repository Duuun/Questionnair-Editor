import { message } from 'antd'
import axios from 'axios'
import { getToken } from '../utils/user-token'

const instance = axios.create({
  timeout: 10 * 1000,
})

// 请求拦截器：请求头注入 token
instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${getToken()}` // JWT 的固定格式
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器：统一处理 errno 和message

instance.interceptors.response.use(res => {
  const resDate = (res.data || {}) as ResType
  const { errno, data, msg } = resDate

  if (errno !== 0) {
    // 进行错误提示
    if (msg) {
      message.error(msg)
    }
    throw new Error(msg)
  }
  return data as any
})

export default instance

export type ResType = {
  errno: number
  data?: ResDateType
  msg?: string
}

export type ResDateType = {
  [key: string]: any //key值是字符串
}

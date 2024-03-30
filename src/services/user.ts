import axios, { ResDateType } from './ajax'

// 获取用户信息
export async function getUserInfoService(): Promise<ResDateType> {
  const url = '/api/user/info'
  const data = (await axios.get(url)) as ResDateType
  return data
}

// 注册用户
export async function registerService(
  username: string,
  password: string,
  nickname?: string
): Promise<ResDateType> {
  const url = '/api/user/register'
  const body = { username, password, nickname: nickname || username }
  const data = (await axios.post(url, body)) as ResDateType
  return data
}

// 登录
export async function loginService(username: string, password: string): Promise<ResDateType> {
  const url = '/api/user/login'
  const body = { username, password }
  const data = (await axios.post(url, body)) as ResDateType
  return data
}

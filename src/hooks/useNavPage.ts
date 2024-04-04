import { useEffect } from 'react'
import useGetUserInfo from './useGetUserInfo'
import { HOME_PATHNAME, LOGIN_PATHNAME, isLoginOrRegister, isNoNeedUserInfo } from '../router'
import { useLocation, useNavigate } from 'react-router-dom'

import { MANAGE_INDEX_PATHNAME } from '../router'

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()
  const nav = useNavigate()

  useEffect(() => {
    // 如果真在等待，就直接返回
    if (waitingUserData) return

    if (username) {
      // 已经登录
      // 不能跳到登录和注册页 ->如果访问这两个直接跳到我的问卷页
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME)
      }
      return
    }

    // 未登录
    // 访问不需要用户信息的界面 -> 不管
    // 访问需要用户信息的界面 -> 跳转到登录页
    if (isNoNeedUserInfo(pathname)) {
      return
    } else {
      nav(LOGIN_PATHNAME)
    }
  }, [waitingUserData, username, pathname])
}

export default useNavPage

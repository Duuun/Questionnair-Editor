import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import useGetUserInfo from './useGetUserInfo'
import { getUserInfoService } from '../services/user'
import { useDispatch } from 'react-redux'
import { loginReducer } from '../store/userReducer'

function useLoadUserData() {
  const dispatch = useDispatch()
  const [waitingUserData, setWaitingUserData] = useState(true) //加载完了吗的状态

  //   用useRequest发送ajax请求,在下面run
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result
      //   将获取到的用户信息存到 redux store中,通过loginReducer
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setWaitingUserData(false)
    },
  })

  // 获取之前，看看现在有没有,有的话就不用获取了
  const { username } = useGetUserInfo()

  useEffect(() => {
    // 有就不用发送ajax，直接返回
    if (username) {
      setWaitingUserData(false)
      return
    }
    run() // 没有用户信息，run
  }, [username])

  // ajax加载完用户信息后，放在redux中，这里返回是仅仅是加载完了吗的状态
  return { waitingUserData }
}

export default useLoadUserData

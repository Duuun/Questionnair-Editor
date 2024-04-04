import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { userStateType } from '../store/userReducer'

function useGetUserInfo() {
  const { username, nickname } = useSelector<StateType>(state => state.user) as userStateType
  return { username, nickname }
}

export default useGetUserInfo

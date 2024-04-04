import { configureStore } from '@reduxjs/toolkit'
import userReducer, { userStateType } from './userReducer'

export type StateType = {
  user: userStateType
}

export default configureStore({
  reducer: {
    user: userReducer,

    // 分模块
  },
})

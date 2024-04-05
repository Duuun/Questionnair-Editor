import { configureStore } from '@reduxjs/toolkit'
import userReducer, { userStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer'

export type StateType = {
  user: userStateType
  components: ComponentsStateType
}

export default configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer,

    // 分模块
  },
})

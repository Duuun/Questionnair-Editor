import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type userStateType = {
  username: string
  nickname: string
}

const INIT_STATE: userStateType = { username: '', nickname: '' }

export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    loginReducer: (state: userStateType, action: PayloadAction<userStateType>) => {
      return action.payload
    },
    logoutReducer: () => INIT_STATE,
  },
})

export const { loginReducer, logoutReducer } = userSlice.actions

export default userSlice.reducer

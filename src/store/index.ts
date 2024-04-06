import { configureStore } from '@reduxjs/toolkit'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'
import userReducer, { userStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'

export type StateType = {
  user: userStateType
  components: StateWithHistory<ComponentsStateType> // 增加了 undo
  pageInfo: PageInfoType
}

export default configureStore({
  reducer: {
    user: userReducer,

    // // 没有 undo
    // components: componentsReducer,

    // 增加了 undo
    components: undoable(componentsReducer, {
      limit: 20, // 限制 undo 20 步
      // 除了这些
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]),
    }),
    pageInfo: pageInfoReducer,
  },
})

import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ComponentsStateType } from '../store/componentsReducer'

// 从 redux store 获取
function useGetComponentInfo() {
  const components = useSelector<StateType>(
    state => state.components.present
  ) as ComponentsStateType

  const { componentList = [], selectedId, copiedComponent } = components

  // 拿到选中的组件
  const selectedComponent = componentList.find(c => c.fe_id === selectedId)

  return {
    componentList,
    selectedId,
    selectedComponent,
    copiedComponent,
  }
}

export default useGetComponentInfo

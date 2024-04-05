import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { ComponentPropsType, getComponentConfByType } from '../../../component/QuestionComponents'
import { changeComponentProps } from '../../../store/componentsReducer'

// 定义一个没有选中任何组件的样式
const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中任何组件</div>
}

const ComponentProp: FC = () => {
  const dispatch = useDispatch()

  // 拿到当前选中的组件
  const { selectedComponent } = useGetComponentInfo()
  if (selectedComponent == null) return <NoProp />
  const { type, props, isLocked, isHidden } = selectedComponent
  //   根据type来找组件的配置
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return <NoProp />

  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return
    const { fe_id } = selectedComponent
    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  const { PropsComponent } = componentConf

  return <PropsComponent {...props} onChange={changeProps} disabled={isLocked || isHidden} />
}

export default ComponentProp

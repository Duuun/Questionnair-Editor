import React, { FC, MouseEvent } from 'react'
import styles from './EditCanvas.module.scss'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { Spin } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { ComponentInfoType, changeSelectedId } from '../../../store/componentsReducer'
import { getComponentConfByType } from '../../../component/QuestionComponents'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'

// 临时静态展示title和input
// import QuestionTitle from '../../../component/QuestionComponents/QuestionTitle/Component'
// import QuestionInput from '../../../component/QuestionComponents/QuestionInput/Component'

type PropsType = {
  loading: boolean
}

// 拿到 组件 的函数
function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo // 每个组件的信息，是从 redux store 获取的（服务端获取）

  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null

  const { Component } = componentConf
  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const dispatch = useDispatch()
  // 调用 从 redux store 获取组件信息的函数
  const { componentList, selectedId } = useGetComponentInfo()
  console.log('componentList', componentList)

  // 拿到点击组件的id ，dispatch到redux中，然后可以用
  function handleClick(even: MouseEvent, id: string) {
    even.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  // 绑定快捷键
  useBindCanvasKeyPress()

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }

  // 动态渲染组件
  return (
    <div className={styles.canvas}>
      {componentList
        .filter(c => c.isHidden)
        .map(c => {
          const { fe_id, isLocked } = c

          // 拼接class name
          const wrapperDefaultClassName = styles['component-wrapper']
          const selectedClassName = styles.selected
          const lockedClassName = styles.locked
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedId,
            [lockedClassName]: isLocked,
          })

          return (
            <div key={fe_id} className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
              <div className={styles.component}>{genComponent(c)}</div>
            </div>
          )
        })}
    </div>
  )
}

export default EditCanvas

import React, { FC, MouseEvent } from 'react'
import styles from './EditCanvas.module.scss'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { Spin } from 'antd'
import SortableContainer from '../../../component/DragSortable/SortableContainer'
import SortableItem from '../../../component/DragSortable/SortableItem'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
  ComponentInfoType,
  changeSelectedId,
  moveComponent,
} from '../../../store/componentsReducer'
import { getComponentConfByType } from '../../../component/QuestionComponents'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'

// 临时静态展示title和input
// import QuestionTitle from '../../../component/QuestionComponents/QuestionTitle/Component'
// import QuestionInput from '../../../component/QuestionComponents/QuestionInput/Component'

type PropsType = {
  loading: boolean
}

// 1. 拿到 组件 的函数
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

  // 2. 拿到点击组件的id ，dispatch到redux中，然后可以用
  function handleClick(even: MouseEvent, id: string) {
    even.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  // 3. 绑定快捷键
  useBindCanvasKeyPress()

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }

  // 4. SortableContainer 组件的 items 属性，需要每个 item 都有 id
  const componentListWithId = componentList.map(c => {
    return { ...c, id: c.fe_id }
  })

  // 5. 拖拽排序结束
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }

  // 6. 动态渲染组件
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter(c => !c.isHidden)
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
              <SortableItem key={fe_id} id={fe_id}>
                <div className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
                  <div className={styles.component}>{genComponent(c)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}

export default EditCanvas

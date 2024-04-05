import React, { FC } from 'react'
import { Typography } from 'antd'
import { ComponentConfType, componentConfGroup } from '../../../component/QuestionComponents'
import styles from './ComponentLip.module.scss'
import { useDispatch } from 'react-redux'
import { addComponent } from '../../../store/componentsReducer'
import { nanoid } from '@reduxjs/toolkit'

const { Title } = Typography

// 显示组件函数
function genComponent(c: ComponentConfType) {
  const { title, type, Component, defaultProps } = c
  const dispatch = useDispatch() //一定要写在里面

  function handleClick() {
    dispatch(
      addComponent({
        fe_id: nanoid(), // 产生一个不重复的随机数
        title,
        type,
        props: defaultProps,
      })
    )
  }

  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

const Lip: FC = () => {
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group

        // 一般 index 不能当 key，(业务场景),这里做静态展示可以用一下,如果不想用可以加一个groupId，不重复就行，已加
        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0px' }}>
              {groupName}
            </Title>
            <div>{components.map(c => genComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}

export default Lip

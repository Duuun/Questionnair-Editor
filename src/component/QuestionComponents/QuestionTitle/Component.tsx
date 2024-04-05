import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from './interface'

const { Title } = Typography

const QuestionTitle: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  // 先解构默认的值，然后用我们传进来的参数覆盖掉
  const { text = '', level = 1, isCenter = false } = { ...QuestionTitleDefaultProps, ...props }

  // 设置不同层级的字体大小
  const genFontSize = (level: number) => {
    if (level === 1) return '24px'
    if (level === 2) return '20px'
    if (level === 3) return '16px'
    return '16px'
  }

  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? 'center' : 'start',
        marginBottom: '0',
        fontSize: genFontSize(level),
      }}
    >
      {text}
    </Title>
  )
}

export default QuestionTitle

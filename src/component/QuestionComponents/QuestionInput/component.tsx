import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionInputPropsType, QuestionInputDefaultProps } from './interface'

const { Paragraph } = Typography

const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <input placeholder={placeholder}></input>
      </div>
    </div>
  )
}

export default QuestionInput

export type QuestionInputPropsType = {
  title?: string
  placeholder?: string

  onChange?: (newProps: QuestionInputPropsType) => void
  disabled?: boolean
}

export const QuestionInputDefaultProps: QuestionInputPropsType = {
  title: '请输入标题',
  placeholder: '请输入...',
}

import { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'

// 统一各个组件的 prop type
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

// 统一 组件的 配置  -> 然后再各个组件中引用这个配置
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType> //各个组件
  PropsComponent: FC<ComponentPropsType> //各个组件的属性
  defaultProps: ComponentPropsType
}

// 全部的组件配置列表
const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf]

// 组件分组
export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionTitleConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf],
  },
]

// 然后根据类型去获取每个属性对应的配置
export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type)
}

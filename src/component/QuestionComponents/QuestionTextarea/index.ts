/**
 * @description 问卷 多行输入
 * @author Dunn
 */

import Component from './Component'
import PropsComponent from './PropsComponent'
import { QuestionTextareaDefaultProps } from './interface'

export * from './interface'

// Textarea 组件的配置
export default {
  title: '多行输入',
  type: 'questionTextarea', // 要和后端统一好
  Component, // 画布显示的组件
  PropsComponent, // 修改属性
  defaultProps: QuestionTextareaDefaultProps,
}

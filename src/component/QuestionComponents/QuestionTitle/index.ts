/**
 * @description 问卷 Title
 * @author Dunn
 */

import Component from './Component'
import { QuestionTitleDefaultProps } from './interface'
import PropsComponent from './PropsComponent'

export * from './interface'

//  Title 组件的配置
export default {
  title: '输入框',
  type: 'questionTitle', //要和后端统一好
  Component, // 画布显示组件
  PropsComponent, // 修改属性
  defaultProps: QuestionTitleDefaultProps, //默认值
}

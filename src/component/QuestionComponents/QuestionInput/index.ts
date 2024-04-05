/**
 * @description 问卷 输入框
 * @author Dunn
 */

import Component from './Component'
import { QuestionInputDefaultProps } from './interface'
import PropsComponent from './PropsComponent'

export * from './interface'

export default {
  title: '输入框',
  type: 'questionInput', //要和后端统一好
  Component, // 画布显示组件
  PropsComponent, // 修改属性
  defaultProps: QuestionInputDefaultProps, //默认值
}

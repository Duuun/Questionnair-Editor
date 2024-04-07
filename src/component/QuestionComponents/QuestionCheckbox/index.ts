/**
 * @description 问卷 checkbox
 * @author Dunn
 */

import Component from './Component'
import PropsComponent from './PropsComponent'
import StatComponent from './StatComponent'

import { QuestionCheckboxDefaultProps } from './interface'

export * from './interface'

export default {
  title: '多选',
  type: 'questionCheckbox', // 要和后端统一好
  Component,
  PropsComponent,
  StatComponent,

  defaultProps: QuestionCheckboxDefaultProps,
}

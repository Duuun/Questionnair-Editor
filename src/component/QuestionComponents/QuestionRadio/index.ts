/**
 * @description 问卷 radio
 * @author 双越老师
 */

import Component from './Component'
import PropsComponent from './PropsComponent'
import { QuestionRadioDefaultProps } from './interface'

export * from './interface'

export default {
  title: '单选',
  type: 'questionRadio',
  Component,
  PropsComponent,
  defaultProps: QuestionRadioDefaultProps,
}

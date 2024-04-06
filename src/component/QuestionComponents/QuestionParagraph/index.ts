/**
 * @description 问卷 - 段落
 * @author Dunn
 */

import Component from './Component'
import PropsComponent from './PropsComponent'
import { QuestionParagraphDefaultProps } from './interface'

export * from './interface'

// Paragraph 组件的配置
export default {
  title: '段落',
  type: 'questionParagraph', // 要和后端统一好
  Component,
  PropsComponent,
  defaultProps: QuestionParagraphDefaultProps,
}

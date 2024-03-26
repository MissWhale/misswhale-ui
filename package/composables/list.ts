import type { InjectionKey } from 'vue'
import { colorProps, type Color } from './color'
import { sizeProps } from './size'
export type ListValueObject = {
  title: string | number
  value: ListValue
  subList?: ListValue[]
  icon?: string
  [x: string]: ListValue | ListValue[] | Boolean | undefined
}
export type ListValue = string | number | ListValueObject

export type SelectListsData = {
  title: string | number
  value: ListValue
  selected: boolean
  opend: boolean
  isGroup: boolean
  subList: SelectListsData[]
  icon?: string
  [x: string]: ListValue | boolean | SelectListsData[] | undefined
}
export type ListPropsInjection = {
  size: string | null
  disabled: Boolean
  color: Color
  returnObject: Boolean
}
export const ListInjectionKey = Symbol() as InjectionKey<ListPropsInjection>
export const ListProps = {
  listTitle: {
    type: String,
    default: 'title'
  },
  listValue: {
    type: String,
    default: 'value'
  },
  isSelect: Boolean,
  isOpen: Boolean,
  disabled: Boolean,
  multiple: Boolean,
  returnObject: Boolean,
  ...colorProps,
  ...sizeProps
}

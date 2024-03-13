import type { PropType } from 'vue'

export type Size = 'small' | 'medium' | 'big' | null
export const allowedSize = ['small', 'medium', 'big', null] as const
export const sizeProps = {
  size: {
    type: String as PropType<Size>,
    default: 'medium',
    validator: (v: any) => allowedSize.includes(v)
  }
}

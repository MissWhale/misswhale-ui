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
export function sizeReturnNumber(size: Number | String) {
  if (typeof size === 'number') return size
  else if (typeof size === 'string') {
    if (size.includes('px')) return Number(size.replace(/px/g, ''))
    else return Number(size)
  } else return 0
}

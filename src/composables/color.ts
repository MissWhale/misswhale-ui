import { computed, ref, type PropType } from 'vue'
export type BaseColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning'
export type Color = BaseColor | string | null | undefined
export const colorProps = {
  color: {
    type: String as PropType<Color>,
    default: null
  }
}
export const useColorStyle = (color: Color) => {
  const colorStyle = ref<{ '--color': string } | null>(null)
  const colorClass = ref<string | null>(null)
  const colorCode = computed(() => {
    return ((color: Color) => {
      switch (color) {
        case 'primary':
          return '#1a5cff'
        case 'secondary':
          return '#5b85aa'
        case 'success':
          return '#46c93a'
        case 'error':
          return '#ff4757'
        case 'warning':
          return '#ffba00'
        default:
          return color
      }
    })(color)
  })
  if (color === 'primary') {
    colorClass.value = 'primary'
    colorStyle.value = { '--color': 'var(--primary)' }
  } else if (color === 'secondary') {
    colorClass.value = 'secondary'
    colorStyle.value = { '--color': 'var(--secondary)' }
  } else if (color === 'success') {
    colorClass.value = 'success'
    colorStyle.value = { '--color': 'var(--success)' }
  } else if (color === 'error') {
    colorClass.value = 'error'
    colorStyle.value = { '--color': 'var(--error)' }
  } else if (color === 'warning') {
    colorClass.value = 'warning'
    colorStyle.value = { '--color': 'var(--warning)' }
  } else if (color) colorStyle.value = { '--color': color }
  return {
    colorStyle,
    colorClass,
    colorCode
  }
}

import { computed, ref, type PropType } from 'vue'
export type BaseColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'warning'
  | 'white'
  | 'black'
export type Color = BaseColor | string | null | undefined
export const colorProps = {
  color: {
    type: String as PropType<Color>,
    default: null
  }
}
export const useColorStyle = (color: Color) => {
  const colorStyle = ref<{
    '--color': string
    '--text-color': string
    '--color-active': string
    '--colorHex': string
  } | null>(null)
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
        case 'dark':
          return '#000000'
        case 'white':
          return '#FFFFFF'
        default:
          return color
      }
    })(color)
  })
  if (color === 'primary') {
    colorClass.value = 'primary'
    colorStyle.value = {
      '--color': 'var(--primary)',
      '--text-color': '#FFFFFF',
      '--color-active': 'var(--primary)',
      '--colorHex': 'var(--primaryHex)'
    }
  } else if (color === 'secondary') {
    colorClass.value = 'secondary'
    colorStyle.value = {
      '--color': 'var(--secondary)',
      '--text-color': '#FFFFFF',
      '--color-active': 'var(--secondary)',
      '--colorHex': 'var(--secondaryHex)'
    }
  } else if (color === 'success') {
    colorClass.value = 'success'
    colorStyle.value = {
      '--color': 'var(--success)',
      '--text-color': '#FFFFFF',
      '--color-active': 'var(--success)',
      '--colorHex': 'var(--successHex)'
    }
  } else if (color === 'error') {
    colorClass.value = 'error'
    colorStyle.value = {
      '--color': 'var(--error)',
      '--text-color': '#FFFFFF',
      '--color-active': 'var(--error)',
      '--colorHex': 'var(--errorHex)'
    }
  } else if (color === 'warning') {
    colorClass.value = 'warning'
    colorStyle.value = {
      '--color': 'var(--warning)',
      '--text-color': '#FFFFFF',
      '--color-active': 'var(--warning)',
      '--colorHex': 'var(--warningHex)'
    }
  } else if (color === 'black') {
    colorClass.value = 'black'
    colorStyle.value = {
      '--color': '#000000',
      '--text-color': '#FFFFFF',
      '--color-active': '#000000',
      '--colorHex': '#000000'
    }
  } else if (color === 'white') {
    colorClass.value = 'white'
    colorStyle.value = {
      '--color': '#FFFFFF',
      '--text-color': '#000000',
      '--color-active': '#FFFFFF',
      '--colorHex': '#FFFFFF'
    }
  } else if (color)
    colorStyle.value = {
      '--color': color,
      '--text-color': '#FFFFFF',
      '--color-active': color,
      '--colorHex': color
    }
  return {
    colorStyle,
    colorClass,
    colorCode
  }
}

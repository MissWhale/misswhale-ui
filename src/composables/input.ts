import { getUid } from './currentInstance'
import { ValidationRule } from './validation'
import { computed, ref, watch } from 'vue'
export const InputType = [
  'text',
  'date',
  'number',
  'tel',
  'search',
  'url',
  'password',
  'month',
  'time',
  'week',
  'email'
]
export type InputAtomicValue = string | number | undefined | null | File | Blob | Object
export type InputModelValue = InputAtomicValue | InputAtomicValue[]
export const DefaultInputProps = {
  label: String,
  hint: String,
  placeholder: String,
  id: String,
  loading: Boolean,
  rules: {
    type: Array<ValidationRule>,
    default: [],
    required: false
  },
  disabled: Boolean,
  color: String,
  clearable: Boolean,
  validate: {
    type: Boolean,
    default: false
  },
  hideDetails: Boolean
}
export interface Props {
  modelValue: InputModelValue
  validate: boolean
  [x: string]: any
}
export interface DefaultInputEmits {
  (e: 'update:modelValue', value: InputModelValue): void
  (e: 'update:validate', value: boolean): void
}
export const useInput = <T extends Record<string, any>, O extends DefaultInputEmits>(
  props: T,
  emit: O
) => {
  const uid = getUid()
  const id = computed(() => props.id || `input-${uid}`)
  const firstInput = ref(false)
  const innerLoading = ref(false)
  const value = computed({
    get() {
      return props.modelValue
    },
    set(v: any) {
      firstInput.value = true
      if (props.type === 'number') {
        if (v === 0) {
          emit('update:modelValue', 0)
        } else return emit('update:modelValue', Number(String(v).replace(/0[0-9]{0}/g, '')))
      } else emit('update:modelValue', v)
    }
  })
  const validate = computed({
    get() {
      return props.validate
    },
    set(v) {
      if (v !== props.validate) emit('update:validate', v)
    }
  })
  const validationRule = computed(() => {
    return firstInput.value
      ? props.rules
          .map((x: ValidationRule) => {
            if (typeof x === 'function') return x(value.value)
            else return x
          })
          .filter((x: boolean) => x !== true)
      : []
  })
  const isValidate = computed(() => !validationRule.value.length)
  const errorMessage = computed(() => {
    if (validationRule.value.length) {
      return validationRule.value[0]
    } else {
      return null
    }
  })
  const hint = computed(() => {
    if (errorMessage.value) return errorMessage.value
    else if (props.hint) return props.hint
    return ''
  })
  const isShowDetails = computed(() => !props.hideDetails && hint.value)
  watch(isValidate, () => {
    validate.value = isValidate.value
  })
  const isClearable = computed(() => !!value.value && props.clearable)
  const loading = computed({
    get() {
      return props.loading || innerLoading.value
    },
    set(v: boolean) {
      innerLoading.value = v
    }
  })
  function clearClick() {
    value.value = null
    validate.value = false
    firstInput.value = false
  }
  return { value, validate, isValidate, id, hint, isShowDetails, clearClick, isClearable, loading }
}

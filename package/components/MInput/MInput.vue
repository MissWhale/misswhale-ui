<script setup lang="ts" generic="T extends any">
import { computed, type PropType, defineProps } from 'vue'
import {
  DefaultInputProps,
  type DefaultInputEmits,
  InputType,
  useInput
} from '../../composables/input'
import { sizeProps, useColorStyle } from '../../composables'
import MIcon from '../MIcon/MIcon.vue'
import MLoading from '../MLoading/MLoading.vue'
import '../../assets/base.css'
import '../../assets/main.scss'
import './MInput.scss'
const emit = defineEmits<DefaultInputEmits>()
const props = defineProps({
  modelValue: {
    type: [String, Number, null, File, Blob, Object] as PropType<T>,
    default: null,
    required: true
  },
  type: {
    type: String,
    default: 'text',
    required: false,
    validator: (prop: string): boolean => InputType.includes(prop)
  },
  ...DefaultInputProps,
  ...sizeProps
})
const {
  value,
  isValidate,
  id,
  hint,
  isShowDetails,
  isClearable,
  clearClick,
  setValidate,
  resetInput,
  loading
} = useInput(props, emit)
const { colorStyle, colorClass } = useColorStyle(props.color)
const styleClass = computed(() => [
  props.size,
  {
    disabled: props.disabled,
    placeholder: !!props.placeholder,
    'not-validate': !isValidate.value
  },
  colorClass.value
])
defineExpose({
  setValidate,
  resetInput
})
</script>

<template>
  <div class="m-input" :class="styleClass" :style="{ ...colorStyle }">
    <div class="m-input-content">
      <input
        :id="id"
        v-model="value"
        :type="type"
        :placeholder="placeholder"
        autocomplete="off"
        required
        class="input"
      />
      <label v-if="label" :for="id" class="m-input-label">{{ label }}</label>
      <div v-if="!loading" class="m-input-clear-wrapper">
        <MIcon
          class="clear-icon"
          :class="{ show: isClearable }"
          icon="mdi:clear-circle"
          size="16"
          @click="clearClick"
        />
      </div>
      <MLoading
        v-if="loading"
        width="2"
        size="16"
        loading
        class="m-input-loading"
        :style="colorStyle"
      />
    </div>
    <div v-show="isShowDetails" class="m-input-details">
      <span>{{ hint }}</span>
    </div>
  </div>
</template>

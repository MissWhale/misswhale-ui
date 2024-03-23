<script setup lang="ts">
import { computed } from 'vue'
import { colorProps, useColorStyle } from '../../composables/color'
import { sizeProps, sizeReturnNumber } from '../../composables/size'
import './MButton.scss'
import MIcon from '../MIcon/MIcon.vue'
import MLoading from '../MLoading/MLoading.vue'
const emits = defineEmits<{
  click: [value: Event]
}>()
const props = defineProps({
  text: String,
  icon: String,
  disabled: Boolean,
  block: Boolean,
  width: [Number, String],
  outline: Boolean,
  plain: Boolean,
  textColor: String,
  loading: Boolean,
  ...colorProps,
  ...sizeProps
})
const { colorStyle, colorClass } = useColorStyle(props.color)
const width = computed(() => (props.width ? sizeReturnNumber(props.width) : undefined))
const styleClass = computed(() => [
  colorClass.value,
  {
    disabled: props.disabled,
    block: props.block,
    outline: props.outline,
    plain: props.plain,
    loading: props.loading
  },
  props.size
])
const buttonStyle = computed(() => [
  { width: width.value + 'px' },
  { ...colorStyle.value, '--text-color': props.textColor || colorStyle.value?.['--text-color'] }
])
const loadingColor = computed(() => (props.outline || props.plain ? props.color : 'white'))
const buttonClick = (e: Event) => {
  if (!props.disabled && !props.loading) emits('click', e)
}
const onlyIcon = computed(() => props.icon && !props.text)
</script>

<template>
  <button class="m-button" :class="styleClass" :style="buttonStyle" @click="buttonClick">
    <template v-if="loading">
      <MLoading loading width="2" size="20" :color="loadingColor" />
    </template>
    <template v-else-if="onlyIcon">
      <MIcon :icon="props.icon!" class="m-button-icon" />
    </template>
    <template v-else>
      <MIcon v-if="props.icon" :icon="props.icon" class="m-button-icon" />
      <span class="m-button-text">{{ text }}</span>
    </template>
  </button>
</template>

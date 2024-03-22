<script setup lang="ts">
import { computed, inject, type PropType } from 'vue'
import './MListGroup.scss'
import MIcon from '@/components/MIcon/MIcon.vue'
import MListItem from './MListItem.vue'
import {
  ListInjectionKey,
  type ListPropsInjection,
  type ListValue,
  type SelectListsData
} from '../../composables/list'
import { useColorStyle } from '../../composables/color'
const emits = defineEmits<{
  click: [value: ListValue]
  groupClick: [value: ListValue]
}>()
const props = defineProps({
  value: {
    type: [String, Number, Object] as PropType<ListValue>,
    required: true
  },
  title: {
    type: [String, Number]
  },
  subList: {
    type: Array as PropType<SelectListsData[]>,
    default: () => []
  },
  opend: Boolean,
  icon: String
})
const injectionData = inject(ListInjectionKey) as ListPropsInjection
const { colorStyle, colorClass } = useColorStyle(injectionData.color)
const groupClass = computed(() => ({ opend: props.opend }))
const styleClass = computed(() => [
  injectionData.size,
  { disabled: injectionData.disabled },
  colorClass.value
])
const arrowIconClass = computed(() => ({ up: props.opend }))
const groupClick = () => {
  emits('groupClick', props.value)
}
const enter = (element: Element) => {
  if (element instanceof HTMLElement) {
    element.style.height = '0px'
    requestAnimationFrame(() => {
      element.style.height = element.scrollHeight + 'px'
    })
  }
}
const afterEnter = (element: Element) => {
  if (element instanceof HTMLElement) {
    element.style.height = ''
  }
}
const leave = (element: Element) => {
  if (element instanceof HTMLElement) {
    element.style.height = element.scrollHeight + 'px'
    requestAnimationFrame(() => {
      element.style.height = '0px'
    })
  }
}
</script>

<template>
  <li
    class="m-list-group"
    :class="[styleClass, groupClass]"
    :style="[colorStyle]"
    @click.self="groupClick"
  >
    <div class="m-list-group-panel" :style="[colorStyle]" @click.self="groupClick">
      <MIcon v-if="icon" :icon="icon" class="m-list-group-icon" />
      <span class="m-list-group-title" @click.self="groupClick">{{ title }}</span>
      <MIcon icon="mdi:keyboard-arrow-down" class="m-list-group-arrow" :class="arrowIconClass" />
    </div>
    <Transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave">
      <ul v-show="opend" class="m-list-group-list" :class="groupClass">
        <MListItem
          v-for="list in subList"
          :key="list.title"
          :value="list.value"
          :title="list.title"
          :selected="list.selected"
          :icon="list.icon"
          isGroup
          @click="emits('click', $event)"
        />
      </ul>
    </Transition>
  </li>
</template>

<script setup lang="ts" generic="T extends any">
import { ListInjectionKey, type ListPropsInjection } from '@/composables/list'
import { computed, inject, type PropType } from 'vue'
const emits = defineEmits({})
const props = defineProps({
  item: {
    type: [String, Number, Object] as PropType<T>
  },
  title: {
    type: [String, Number]
  }
})
const injectionData = inject(ListInjectionKey) as ListPropsInjection
const styleClass = computed(() => [injectionData.size, { disabled: injectionData.disabled }])
</script>

<template>
  <li class="m-list-item" :class="styleClass">{{ title }}</li>
</template>

<style scoped lang="scss">
li.m-list-item {
  &.small {
    padding: 2px;
  }
  &.medium {
    padding: 4px;
  }
  &.big {
    padding: 8px;
  }
  &.disabled {
    color: var(--vt-c-text-dark-1);
  }
}
</style>

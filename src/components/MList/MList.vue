<script setup lang="ts" generic="T extends test, S = unknown">
export type test = string | number | Record<string, any>
export type Size = 'small' | 'medium' | 'big' | null
import { computed, provide, readonly, toRef, toRefs, type PropType } from 'vue'
import MListItem from './MListItem.vue'
import { sizeProps } from '@/composables/size'
import { ListInjectionKey } from '@/composables/list'
const props = defineProps({
  list: {
    type: Array as PropType<T[]>,
    default: () => []
  },
  itemTitle: {
    type: String,
    default: 'title'
  },
  itemValue: String,
  isSelect: Boolean,
  disabled: Boolean,
  selectList: Array as PropType<S[]>,
  returnObject: Boolean,
  ...sizeProps
})

const lists = computed(() => {
  return props.list.map((data: T) => {
    if (typeof data === 'string' || typeof data === 'number') {
      return {
        title: String(data),
        value: String(data)
      }
    } else if (typeof data === 'object') {
      return {
        title: props.itemTitle ? data[props.itemTitle] : undefined,
        value: props.itemValue ? data[props.itemValue] : undefined
      }
    }
  })
})
const styleClass = computed(() => [props.size, { disabled: props.disabled }])
provide(
  ListInjectionKey,
  readonly({
    size: toRef(props, 'size'),
    disabled: toRef(props, 'disabled')
  })
)
</script>

<template>
  <ul class="m-list" :class="styleClass">
    <slot name="list" :list="list">
      <MListItem v-for="(item, i) in lists" :key="i" v-bind="item">
        <slot name="list-item" :item="item"> </slot>
      </MListItem>
    </slot>
  </ul>
</template>

<style scoped lang="scss">
@import url('@/assets/main.scss');
ul.m-list {
  color: var(--color-text);
  background: var(--color-background);
  &.small {
    padding: 4px;
  }
  &.medium {
    padding: 8px;
  }
  &.big {
    padding: 12px;
  }
}
</style>

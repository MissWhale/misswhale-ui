<script setup lang="ts" generic="T extends ListValue">
import "../../assets/base.css";
import "../../assets/main.scss";
import "./MListItem.scss";
import { useColorStyle } from "../../composables/color";
import {
  ListInjectionKey,
  type ListPropsInjection,
  type ListValue,
} from "../../composables/list";
import { computed, inject, type PropType } from "vue";
import MIcon from "../MIcon/MIcon.vue";
const emits = defineEmits<{
  click: [value: T];
}>();
const props = defineProps({
  value: {
    type: [String, Number, Object] as PropType<ListValue>,
    required: true,
  },
  title: {
    type: [String, Number],
  },
  selected: {
    type: Boolean,
    required: true,
  },
  isGroup: {
    type: Boolean,
    default: false,
  },
  icon: String,
});
const injectionData = inject(ListInjectionKey) as ListPropsInjection;
const { colorStyle, colorClass } = useColorStyle(injectionData.color);
const styleClass = computed(() => [
  injectionData.size,
  {
    disabled: injectionData.disabled,
    select: props.selected,
    group: props.isGroup,
  },
  colorClass.value,
]);
const listClick = () => {
  if (!injectionData.disabled) emits("click", props.value as T);
};
</script>

<template>
  <li
    class="m-list-item"
    :class="styleClass"
    :style="[colorStyle]"
    @click="listClick"
  >
    <slot name="default">
      <MIcon v-if="icon" :icon="icon" class="m-list-item-icon" />
      <span class="m-list-item-title">{{ title }}</span>
    </slot>
  </li>
</template>

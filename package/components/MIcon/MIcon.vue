<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "@iconify/vue";
import { useColorStyle } from "../../composables/color";
import "../../assets/base.css";
import "../../assets/main.scss";
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: [String],
    default: undefined,
  },
  size: {
    type: [String, Number],
    default: 24,
  },
});
const { colorCode } = useColorStyle(props.color);
const iconStyle = computed(() => ({
  fontSize: props.size,
  color: colorCode.value,
}));
</script>

<template>
  <Icon class="m-icon" :icon="icon" :style="iconStyle"> </Icon>
</template>

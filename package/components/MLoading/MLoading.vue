<script setup lang="ts">
import { computed } from "vue";
import { colorProps, useColorStyle } from "../../composables/color";
import { sizeReturnNumber } from "../../composables/size";
import "../../assets/base.css";
import "../../assets/main.scss";
import "./MLoading.scss";
const props = defineProps({
  value: {
    type: [Number, String],
    default: 0,
  },
  size: {
    type: [Number, String],
    default: 30,
  },
  rotate: {
    type: Number,
    default: 0,
  },
  width: {
    type: [Number, String],
    default: 4,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  ...colorProps,
});
const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const loadingStyle = computed(() => {
  return {
    width: `${size.value}px`,
    height: `${size.value}px`,
  };
});
const width = computed(() => sizeReturnNumber(props.width));
const size = computed(() => sizeReturnNumber(props.size));
const { colorStyle } = useColorStyle(props.color);
const svgStyle = computed(() => {
  return { transform: `rotate(calc(-90deg + ${Number(props.rotate)}deg))` };
});
const loadingClass = computed(() => {
  return {
    "is-loading": props.loading,
  };
});
const viewBox = computed(() => {
  return `0 0 ${diameter.value} ${diameter.value}`;
});

const normalizedValue = computed(() =>
  Math.max(0, Math.min(100, parseFloat(String(props.value))))
);
const diameter = computed(() => (RADIUS / (1 - width.value / size.value)) * 2);
const strokeWidth = computed(() => (width.value / size.value) * diameter.value);
const strokeDashOffset = computed(
  () => ((100 - normalizedValue.value) / 100) * CIRCUMFERENCE
);
</script>

<template>
  <div class="m-loading" :style="loadingStyle" :class="loadingClass">
    <svg
      :style="svgStyle"
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="viewBox"
    >
      <circle
        class="m-loading-underlay"
        fill="transparent"
        cx="50%"
        cy="50%"
        :r="RADIUS"
        :stroke-width="strokeWidth"
        :stroke-dasharray="CIRCUMFERENCE"
        :stroke-dashoffset="0"
      />
      <circle
        class="m-loading-overlay"
        :style="colorStyle"
        fill="transparent"
        cx="50%"
        cy="50%"
        :r="RADIUS"
        :stroke-width="strokeWidth"
        :stroke-dasharray="CIRCUMFERENCE"
        :stroke-dashoffset="strokeDashOffset"
      />
    </svg>
    <slot name="default"></slot>
  </div>
</template>

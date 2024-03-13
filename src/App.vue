<script setup lang="ts">
import { ref } from 'vue'
import MList from './components/MList/MList.vue'
import type { Size } from './composables/size'
import { useTheme } from './composables/theme'
const test = [
  { title: 'test1' },
  { title: 'test2' },
  { title: 'test3' },
  { title: 'test4' },
  { title: 'test5' }
]
const size = ref<Size>('medium')
const { toggleTheme } = useTheme()
// const disable = ref(false)
</script>

<template>
  <MList :list="test" :size="size"></MList>
  <MList :list="test" :disabled="true"></MList>
  <button @click="toggleTheme">토글</button>
</template>

<style scoped></style>

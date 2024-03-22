<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import MList from './components/MList/MList.vue'
import type { Size } from './composables/size'
import { useTheme } from './composables/theme'
const test = [
  { title: 'test1', value: 1, icon: 'mdi:account-arrow-down' },
  { title: 'test2', value: 2 },
  {
    title: 'test5',
    value: 5,
    icon: 'mdi:user',
    subList: [
      { title: 'test', value: 'test' },
      { title: 'test1', value: 'test1' }
    ]
  },
  { title: 'test3', value: 3 },
  { title: 'test4', value: 4 }
]
const size = ref<Size>('small')
const { toggleTheme } = useTheme()
const select = ref([{ title: 'test1', value: 1 }])
const selectOne = ref([1])
</script>

<template>
  <div>
    <MList :list="test" :size="size" color="primary"></MList>
    <MList
      :list="test"
      return-object
      v-model:selectList="select"
      color="error"
      multiple
      isSelect
    ></MList>
  </div>
  <button @click="toggleTheme">토글</button>
</template>

<style scoped lang="scss">
div {
  display: block;
  margin: 0 auto;
  width: 400px;
}
</style>

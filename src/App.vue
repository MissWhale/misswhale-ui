<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import MList from './components/MList/MList.vue'
import MButton from './components/MButton/MButton.vue'
import MLoading from './components/MLoading/MLoading.vue'
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
const testClick = (e: Event) => {
  console.log(e)
}
</script>

<template>
  <div class="test">
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
  <div class="test">
    <MButton text="test" color="primary" size="small" @click="testClick" />
    <MButton text="test" color="primary" size="small" loading @click="testClick" />
    <MButton text="test" color="primary" disabled @click="testClick" />
    <MButton text="test" color="primary" outline disabled @click="testClick" />
    <MButton text="test" color="error" plain loading @click="testClick" />
    <MButton text="test" color="primary" loading @click="testClick" />
    <MButton text="test" color="error" @click="testClick" />
    <MButton text="test" color="warning" size="big" @click="testClick" />
    <MButton text="test" color="white" size="big" loading @click="testClick" />
    <MButton
      text="testtesttesttesttesttesttesttest"
      color="#F2F232"
      size="big"
      block
      @click="testClick"
    />
  </div>
  <MLoading loading width="5" size="50" color="black" />
  <button @click="toggleTheme">토글</button>
</template>

<style scoped lang="scss">
div {
  &.test {
    display: block;
    margin: 0 auto;
    width: 400px;
    flex-direction: column;
    row-gap: 10px;
  }
}
</style>

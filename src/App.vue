<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import MList from './components/MList/MList.vue'
import MButton from './components/MButton/MButton.vue'
import MLoading from './components/MLoading/MLoading.vue'
import MInput from './components/MInput/MInput.vue'
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
const rules = [
  (value: string | number) =>
    typeof value === 'number' ? value > -1 || value < 0 || '필수항목' : !!value || '필수항목',
  (value: string) => value !== '1' || '데트'
]
const size = ref<Size>('medium')
const { toggleTheme } = useTheme()
const select = ref([{ title: 'test1', value: 1 }])
const selectOne = ref([1])
const testValue = ref()
const validate = ref(false)
const testClick = (e: Event) => {
  console.log(e)
}
</script>

<template>
  <div class="test">
    <MInput
      v-model:model-value="testValue"
      v-model:validate="validate"
      type="text"
      label="test"
      size="medium"
      color="error"
      :rules="rules"
      clearable
      loading
    />
    <!-- <MInput v-model="testValue" type="number" label="test" size="small" /> -->
    <!-- <MInput v-model="testValue" label="test" color="success" />
    <MInput v-model="testValue" label="test" size="big" color="error" />
    <MButton text="test" color="primary" size="small" @click="testClick" /> -->
    <!-- <MInput v-model="testValue" /> -->
  </div>
  <!-- <MList :list="test" :size="size" color="primary"></MList>
  <MList
    :list="test"
    return-object
    v-model:selectList="select"
    color="error"
    multiple
    isSelect
  ></MList> -->
  <!-- <div class="test">
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
    <MLoading loading width="5" size="50" color="black" />
  </div> -->
  <button @click="toggleTheme">토글</button>
</template>

<style scoped lang="scss">
div {
  &.test {
    background: var(--color-background-soft);
    display: flex;
    margin: 0 auto;
    width: 400px;
    height: 400px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    row-gap: 10px;
  }
}
</style>

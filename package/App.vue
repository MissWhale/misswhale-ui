<script setup lang="ts">
import '@/assets/base.css'
import '@/assets/main.scss'
import MIcon from '@/components/MIcon/MIcon.vue'
import MInput from '@/components/MInput/MInput.vue'
import { ref } from 'vue'
const validate = ref(false)
const rule = [(value: any) => !!value || 'test']
const test = ref()
const input = ref()
const reset = () => {
  console.log(input.value)
}
</script>

<template>
  <!-- <Icon icon="mdi:circle" color="primary"></Icon> -->
  <div class="test">
    <MInput
      ref="input"
      v-model="test"
      v-model:validate="validate"
      :rules="rule"
      color="primary"
      clearable
    ></MInput>
    <!-- <MInput v-model="test" color="primary" clearable></MInput>
    <MInput v-model="test" color="primary" clearable></MInput> -->
    <span @click="reset">{{ validate }}</span>
  </div>
</template>

<style scoped lang="scss">
div {
  &.test {
    background: var(--color-background-soft);
    display: flex;
    margin: 0 auto;
    width: 400px;
    height: 400px;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    row-gap: 10px;
  }
}
</style>

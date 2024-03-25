<script setup lang="ts" generic="T extends any">
import { computed, PropType, defineProps } from 'vue'
import { DefaultInputProps, DefaultInputEmits, InputType, useInput } from '../../composables/input'
import { sizeProps, useColorStyle } from '../../composables'
import MIcon from '../MIcon/MIcon.vue'
import MLoading from '../MLoading/MLoading.vue'
const emit = defineEmits<DefaultInputEmits>()
const props = defineProps({
  modelValue: {
    type: [String, Number, null, File, Blob, Object] as PropType<T>,
    default: null,
    required: true
  },
  type: {
    type: String,
    default: 'text',
    required: false,
    validator: (prop: string): boolean => InputType.includes(prop)
  },
  ...DefaultInputProps,
  ...sizeProps
})
const { value, isValidate, id, hint, isShowDetails, isClearable, clearClick, loading } = useInput(
  props,
  emit
)
const { colorStyle, colorClass } = useColorStyle(props.color)
const styleClass = computed(() => [
  props.size,
  { disabled: props.disabled, placeholder: !!props.placeholder, 'not-validate': !isValidate.value },
  colorClass.value
])
</script>

<template>
  <div class="m-input" :class="styleClass" :style="{ ...colorStyle }">
    <div class="m-input-content">
      <input
        :id="id"
        v-model="value"
        :type="type"
        :placeholder="placeholder"
        autocomplete="off"
        required
        class="input"
      />
      <label v-if="label" :for="id" class="m-input-label">{{ label }}</label>
      <div v-if="!isClearable" class="m-input-clear-wrapper">
        <MIcon
          class="clear-icon"
          :class="{ show: isClearable }"
          icon="mdi:clear-circle"
          size="16"
          @click="clearClick"
        />
      </div>
      <MLoading
        v-if="loading"
        width="2"
        size="16"
        loading
        class="m-input-loading"
        :style="colorStyle"
      />
    </div>
    <div v-show="isShowDetails" class="m-input-details">
      <span>{{ hint }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
div.m-input {
  display: flex;
  position: relative;
  flex-direction: column;
  margin: 8px;
  &.small {
    div.m-input-content {
      input {
        padding: 2px 30px 2px 8px;
        min-height: 28px;
        &:focus + label,
        &:valid + label {
          top: -80%;
          transform: translateX(-4px);
        }
      }
      label {
        left: 8px;
      }
    }
    &.placeholder {
      div.m-input-content label {
        top: -80%;
        transform: translateX(-4px);
        font-size: 14px;
      }
    }
    div.m-input-details {
      position: relative;
      margin: 2px 8px;
    }
  }
  &.medium {
    div.m-input-content {
      input {
        padding: 4px 30px 4px 12px;
        min-height: 32px;
        &:focus + label,
        &:valid + label {
          top: -69%;
          transform: translateX(-8px);
        }
      }
      label {
        left: 12px;
      }
    }
    &.placeholder {
      div.m-input-content label {
        top: -69%;
        transform: translateX(-8px);
        font-size: 14px;
      }
    }
    div.m-input-details {
      margin: 4px 12px;
    }
  }
  &.big {
    div.m-input-content {
      input {
        padding: 8px 30px 8px 16px;
        min-height: 40px;
        &:focus + label,
        &:valid + label {
          top: -56%;
          transform: translateX(-12px);
        }
      }
      label {
        left: 16px;
      }
    }
    &.placeholder {
      div.m-input-content label {
        top: -56%;
        transform: translateX(-12px);
        font-size: 14px;
      }
    }
    div.m-input-details {
      margin: 8px 16px;
    }
  }
  &.not-validate {
    color: rgb(var(--error)) !important;
    input {
      border-bottom: 2px solid rgba(var(--error)) !important;
    }
    label {
      color: rgb(var(--error)) !important;
    }
  }
  div.m-input-content {
    position: relative;
    input {
      border-radius: 8px;
      color: var(--text-color);
      background-color: var(--color-background);
      &:focus,
      &:valid {
        color: var(--color-text-active);
        border-bottom: 2px solid rgba(var(--color));
      }
      &:focus + label,
      &:valid + label {
        font-size: 14px;
        color: var(--colorHex, var(--color-text-active));
      }
      &:focus ~ div.m-input-clear-wrapper,
      &:valid ~ div.m-input-clear-wrapper {
        svg.clear-icon.show {
          opacity: 1;
          transform: translateX(-8px);
        }
      }
    }
    label.m-input-label {
      position: absolute;
      cursor: text;
      transition: all 0.25s ease;
      font-size: 16px;
      top: calc(50% - 10px);
      color: var(--color-text);
    }
  }
  div.m-input-details {
    position: relative;
    &.error {
      color: rgb(var(--error));
    }
    span {
      font-size: 12px;
    }
  }
  div.m-input-clear-wrapper {
    position: absolute;
    overflow: hidden;
    width: 30px;
    height: 100%;
    top: 0px;
    right: 0px;
    svg.clear-icon {
      position: absolute;
      right: 0px;
      opacity: 0;
      top: calc(50% - 8px);
      transform: translateX(12px);
      transition: all 0.5s ease-out;
      cursor: pointer;
    }
  }
  div.m-input-loading {
    position: absolute;
    right: 8px;
    top: calc(50% - 8px);
  }
}
</style>

<script
  setup
  lang="ts"
  generic="
    T extends ListValue,
    S extends T | string | number,
    O extends keyof T
  "
>
import "../../assets/base.css";
import "../../assets/main.scss";
import "./MList.scss";
import {
  computed,
  provide,
  readonly,
  ref,
  toRef,
  type PropType,
  type Ref,
} from "vue";
import MListItem from "./MListItem.vue";
import MListGroup from "./MListGroup.vue";
import {
  ListInjectionKey,
  ListProps,
  type ListValue,
  type SelectListsData,
} from "../../composables/list";
const emits = defineEmits<{
  "update:selectList": [value: S[]];
  "update:openList": [value: T[O][]];
}>();
const props = defineProps({
  list: {
    type: Array as PropType<T[]>,
    default: () => [],
  },
  selectList: {
    type: Array as PropType<S[]>,
    default: () => [],
  },
  openList: {
    type: Array as PropType<T[O][]>,
    default: () => [],
  },
  ...ListProps,
});
provide(
  ListInjectionKey,
  readonly({
    size: toRef(props, "size"),
    disabled: toRef(props, "disabled"),
    color: toRef(props, "color"),
    returnObject: toRef(props, "returnObject"),
  })
);
const innerSelect = ref<Array<S>>([]) as Ref<S[]>;
const innerOpen = ref<Array<T[O]>>([]) as Ref<T[O][]>;
const lists = computed(() => setList(props.list));
const selectLists = computed({
  get() {
    return props.isSelect ? props.selectList : innerSelect.value;
  },
  set(v) {
    props.isSelect ? emits("update:selectList", v) : (innerSelect.value = v);
  },
});
const openLists = computed({
  get() {
    return props.isOpen ? props.openList : innerOpen.value;
  },
  set(v) {
    props.isOpen ? emits("update:openList", v) : (innerOpen.value = v);
  },
});
const styleClass = computed(() => [props.size, { disabled: props.disabled }]);
const setList = (list: T[]): SelectListsData[] => {
  return (
    (list?.map((data: T, index: number) => {
      if (typeof data === "string" || typeof data === "number") {
        return {
          title: String(data),
          value: String(data),
          selected: selectLists.value.includes(data as S),
          opend: false,
          isGroup: false,
          subList: [],
        };
      } else {
        return {
          title: props.listTitle ? data[props.listTitle] : index,
          value: (props.listValue
            ? props.returnObject
              ? data
              : data[props.listValue]
            : index) as ListValue,
          selected: props.returnObject
            ? selectLists.value.some((s) => {
                if (typeof s === "object") {
                  if (Object.prototype.hasOwnProperty.call(s, props.listValue))
                    return s[props.listValue] === data[props.listValue];
                  else return false;
                } else return false;
              })
            : selectLists.value.includes(data[props.listValue] as S),
          opend: openLists.value.includes(data[props.listValue] as T[O]),
          isGroup: !!data.subList?.length,
          icon: data.icon,
          subList: setList(data.subList as T[]) || [],
        };
      }
    }) as SelectListsData[]) || []
  );
};
const listClick = (value: ListValue) => {
  if (props.multiple) {
    const isExist = selectLists.value.findIndex((data) => {
      if (typeof data === "object" && typeof value === "object") {
        return data[props.listValue] === value[props.listValue];
      } else return data === value;
    });
    if (isExist > -1) selectLists.value.splice(isExist, 1);
    else selectLists.value.push(value as S);
  } else selectLists.value = [value as S];
};
const groupClick = (value: ListValue) => {
  const isOpenExist = openLists.value.findIndex((data) => {
    if (typeof value === "object") {
      return value[props.listValue] === data;
    } else return value === data;
  });
  if (isOpenExist > -1) openLists.value.splice(isOpenExist, 1);
  else {
    if (typeof value === "object") {
      openLists.value.push(value[props.listValue] as T[O]);
    } else openLists.value.push(value as T[O]);
  }
};
</script>

<template>
  <ul class="m-list" :class="styleClass">
    <slot name="list" :list="list">
      <template v-for="item in lists">
        <template v-if="!item.isGroup">
          <MListItem :key="item.title" v-bind="item" @click="listClick">
            <slot name="list-item" :item="item"> </slot>
          </MListItem>
        </template>
        <template v-else>
          <MListGroup
            :key="item.title"
            v-bind="item"
            @click="listClick"
            @groupClick="groupClick"
          ></MListGroup>
        </template>
      </template>
    </slot>
  </ul>
</template>

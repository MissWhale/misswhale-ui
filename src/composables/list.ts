import type { InjectionKey } from 'vue'

export type ListPropsInjection = {
  size: string | null
  disabled: Boolean
}
export const ListInjectionKey = Symbol() as InjectionKey<ListPropsInjection>

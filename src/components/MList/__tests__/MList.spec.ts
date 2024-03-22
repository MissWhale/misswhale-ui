import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import MList from '../MList.vue'
describe('MList', () => {
  it('mounted', () => {
    const wrapper = mount(MList, { props: { list: [] } })
    expect(wrapper.classes('m-list')).toBe(true)
  })
  it('string list rendering', () => {
    const wrapper = mount(MList, { props: { list: Array.from({ length: 5 }, (v, i) => i) } })
    expect(wrapper.findAll('.m-list-item').length).toEqual(5)
  })
  it('object list rendering', () => {
    const wrapper = mount(MList, {
      props: {
        list: [
          { title: 'test1', value: 1 },
          { title: 'test2', value: 2 },
          { title: 'test3', value: 3 },
          { title: 'test4', value: 4 },
          { title: 'test5', value: 5 }
        ]
      }
    })
    expect(wrapper.findAll('.m-list-item').length).toEqual(5)
  })
})

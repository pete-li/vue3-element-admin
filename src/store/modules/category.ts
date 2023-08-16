import {
  reqAttrInfoList,
  reqGetC1,
  reqGetC2,
  reqGetC3,
} from '@/api/product/attr'
import { defineStore } from 'pinia'
import { AttrInfo, Category } from '@/api/product/attr/type'

export const useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      c1Id: '',
      c2Id: '',
      c3Id: '',
      c1ResArr: [],
      c2ResArr: [],
      c3ResArr: [],
      attrInfoList: [],
    }
  },
  actions: {
    async getC1() {
      const res = await reqGetC1()
      if (res.code === 200) {
        this.c1ResArr = res.data
      }
    },
    async getC2() {
      const res = await reqGetC2(this.c1Id)
      if (res.code === 200) {
        this.c2ResArr = res.data
      }
    },
    async getC3() {
      const res = await reqGetC3(this.c2Id)
      if (res.code === 200) {
        this.c3ResArr = res.data
      }
    },
    async getAttrInfoList() {
      const res = await reqAttrInfoList(this.c1Id, this.c2Id, this.c3Id)
      if (res.code === 200) {
        this.attrInfoList = res.data
      }
    },
  },
  getters: {},
})

interface CategoryState {
  c1Id: number | string
  c2Id: number | string
  c3Id: number | string
  c1ResArr: Category[]
  c2ResArr: Category[]
  c3ResArr: Category[]
  attrInfoList: AttrInfo[]
}

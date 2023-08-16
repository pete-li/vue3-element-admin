import basicResponse from '@/api/base_type'

export interface Category {
  id?: number
  name: string
  category1Id: number
  category2Id: number
  category3Id: number
}

export interface CategoryResData extends basicResponse {
  data: Category[]
}

export interface AttrValue {
  id?: number
  valueName: string
  attrId: number
}

export interface AttrInfo {
  id?: number
  attrName: string
  categoryId: number
  categoryLevel: number
  attrValueList: AttrValue[]
}

export interface AttrInfoResData extends basicResponse {
  data: AttrInfo[]
}

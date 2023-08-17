import basicResponse from '@/api/base_type'

// 分类
export interface Category {
  id?: number
  name: string
  category1Id: number
  category2Id: number
  category3Id: number
}

// 三个分类的响应数据
export interface CategoryResData extends basicResponse {
  data: Category[]
}

// 属性值
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  isEditMode?: boolean
}

// 属性信息
export interface AttrInfo {
  id?: number
  attrName: string
  categoryId: number
  categoryLevel: number
  attrValueList: AttrValue[]
}

// 属性信息响应的整体数据
export interface AttrInfoResData extends basicResponse {
  data: AttrInfo[]
}

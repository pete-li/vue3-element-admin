import request from '@/utils/request'
import { AttrInfo, AttrInfoResData, CategoryResData } from './type'

enum API {
  GET_C1 = '/admin/product/getCategory1',
  GET_C2 = '/admin/product/getCategory2/',
  GET_C3 = '/admin/product/getCategory3/',
  GET_ATTR_INFO = '/admin/product/attrInfoList',
  ADD_OR_UPDATE_ATTR_INFO = '/admin/product/saveAttrInfo',
  DELETE_ATTR_INFO = '/admin/product/deleteAttr/',
}

// 获取一级分类
export const reqGetC1 = () => request.get<any, CategoryResData>(API.GET_C1)

// 获取二级分类
export const reqGetC2 = (category1Id: number | string) =>
  request.get<any, CategoryResData>(API.GET_C2 + category1Id)

// 获取三级分类
export const reqGetC3 = (category2Id: number | string) =>
  request.get<any, CategoryResData>(API.GET_C3 + category2Id)

// 获取属性信息表
export const reqAttrInfoList = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string,
) => {
  if (!category1Id || !category2Id || !category3Id)
    return Promise.reject<Promise<AttrInfoResData>>(
      new Error('分类ID为必填项！'),
    )
  return request.get<any, AttrInfoResData>(
    `${API.GET_ATTR_INFO}/${category1Id}/${category2Id}/${category3Id}`,
  )
}

// 添加或修改属性
export const reqAddOrUpdateAttrInfo = (data: AttrInfo) =>
  request.post<any, any>(API.ADD_OR_UPDATE_ATTR_INFO, data)

// 删除属性信息
export const reqDeleteAttrInfo = (attrId: number) =>
  request.delete<any, any>(API.DELETE_ATTR_INFO + attrId)

import request from '@/utils/request'
import {
  SaleAttrValueResData,
  SpuImgListResData,
  SpuInfo,
  SpuInfoPageNumResData,
} from '@/api/product/spu/type.ts'
import { AllTradeMarListResData } from '@/api/product/trademark/type.ts'
import BasicResponse from '@/api/base_type.ts'

enum API {
  GET_SPU_INFO = '/admin/product',
  GET_ALL_TRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  GET_SPU_IMG_LIST_BY_ID = '/admin/product/spuImageList',
  GET_SALE_ATTR_LIST_BY_ID = '/admin/product/spuSaleAttrList',
  GET_SALE_ATTR_INFO = '/admin/product/baseSaleAttrList',
  ADD_SPU_INFO = '/admin/product/saveSpuInfo',
  EDIT_SPU_INFO = '/admin/product/updateSpuInfo',
  DELETE_SPU_INFO = '/admin/product/deleteSpu',
  // GET_SPU_INFO_BY_ID = 'admin/product/getSpuInfo',
  // GET_SPU_INFO_BY_KEYWORD = '/admin/product/findSpuInfoByKeyword',
  // FIND_SPU_INFO_BY_ID_LIST = '/admin/product/inner/findSpuInfoBySpuIdList',
}

// 获取SPU信息
export const reqGetSpuInfo = (
  page: number,
  limit: number,
  category3Id: number | string,
) =>
  request.get<any, SpuInfoPageNumResData>(
    `${API.GET_SPU_INFO}/${page}/${limit}?category3Id=${category3Id}`,
  )

// 获取销售属性相关信息
export const reqGetSaleAttrInfo = () =>
  request.get<any, BasicResponse>(API.GET_SALE_ATTR_INFO)

// 获取所有的品牌
export const reqGetAllTradeMark = () =>
  request.get<any, AllTradeMarListResData>(API.GET_ALL_TRADEMARK_URL)

// 通过id获取SPU图片列表
export const reqGetSpuImgListById = (spuId: number) =>
  request.get<any, SpuImgListResData>(`${API.GET_SPU_IMG_LIST_BY_ID}/${spuId}`)

// 通过id获取销售属性列表
export const reqGetSaleAttrListById = (spuId: number) =>
  request.get<any, SaleAttrValueResData>(
    `${API.GET_SALE_ATTR_LIST_BY_ID}/${spuId}`,
  )

// 添加或修改SPU信息
export const reqAddOrUpdateSpuInfo = (
  spuInfo: SpuInfo,
): Promise<BasicResponse> => {
  if (spuInfo.id) {
    // 修改
    return request.post<any, BasicResponse>(API.EDIT_SPU_INFO, spuInfo)
  } else {
    // 添加
    return request.post<any, BasicResponse>(API.ADD_SPU_INFO, spuInfo)
  }
}

// 删除SPU信息
export const reqDeleteSpuInfo = (spuId: number) =>
  request.delete<any, BasicResponse>(`${API.DELETE_SPU_INFO}/${spuId}`)

/*
// 通过id获取SPU信息
export const reqGetSpuInfoById = (spuId: number) =>
  request.get<any, BasicResponse>(`${API.GET_SPU_INFO_BY_ID}/${spuId}`)

// 通过关键词获取SPU信息
export const reqGetSpuInfoByKeyword = (keyword: string) =>
  request.get<any, BasicResponse>(`${API.GET_SPU_INFO_BY_KEYWORD}/${keyword}`)

// 通过id列表获取SPU信息
export const reqGetSpuInfoByIdList = (spuIdList: number[]) =>
  request.post<any, BasicResponse>(API.FIND_SPU_INFO_BY_ID_LIST, spuIdList)
* */

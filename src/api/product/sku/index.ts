import request from '@/utils/request'
import {
  SkuDetailByIdResData,
  SkuInfo,
  SkuListByIdResData,
  SkuListByPageResData,
} from '@/api/product/sku/type.ts'
import BasicResponse from '@/api/base_type.ts'

enum API {
  GET_SKU_INFO_BY_PAGE = '/admin/product/list',
  GET_SKU_INFO_BY_ID = '/admin/product/findBySpuId',
  ADD_SKU_INFO = '/admin/product/saveSkuInfo',
  ON_SALE = '/admin/product/onSale/',
  CANCEL_SALE = '/admin/product/cancelSale/',
  DELETE_SKU_INFO = '/admin/product/deleteSku/',
  GET_SKU_DETAIL_BY_ID = '/admin/product/getSkuInfo',
}

// 获得SKU列表(通过页码)
export const reqGetSkuListByPage = (page: number, limit: number) =>
  request.get<any, SkuListByPageResData>(
    `${API.GET_SKU_INFO_BY_PAGE}/${page}/${limit}`,
  )

// 获得SKU列表(通过id)
export const reqGetSkuListById = (spuId: number) =>
  request.get<any, SkuListByIdResData>(`${API.GET_SKU_INFO_BY_ID}/${spuId}`)

// 获得SKU详情(通过id)
export const reqGetSkuDetailById = (spuId: number) =>
  request.get<any, SkuDetailByIdResData>(`${API.GET_SKU_DETAIL_BY_ID}/${spuId}`)

// 添加SKU信息
export const reqAddSkuInfo = (skuInfo: SkuInfo) =>
  request.post<any, BasicResponse>(API.ADD_SKU_INFO, skuInfo)

// 删除SKU信息
export const reqDeleteSkuInfo = (skuId: number) =>
  request.delete<any, BasicResponse>(API.DELETE_SKU_INFO + skuId)

// 上架
export const reqOnSale = (skuId: number) =>
  request.get<any, BasicResponse>(API.ON_SALE + skuId)

// 下架
export const reqCancelSale = (skuId: number) =>
  request.get<any, BasicResponse>(API.CANCEL_SALE + skuId)

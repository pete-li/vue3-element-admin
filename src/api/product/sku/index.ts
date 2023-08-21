import request from '@/utils/request'
import { SkuInfo, SkuListResData } from '@/api/product/sku/type.ts'
import BasicResponse from '@/api/base_type.ts'

enum API {
  ADD_SKU_INFO = '/admin/product/saveSkuInfo',
  GET_SKU_INFO_BY_ID = '/admin/product/findBySpuId',
}

// 通过id获得SKU列表
export const reqGetSkuListById = (spuId: number | string) =>
  request.get<any, SkuListResData>(`${API.GET_SKU_INFO_BY_ID}/${spuId}`)

// 添加SKU信息
export const reqAddSkuInfo = (skuInfo: SkuInfo) =>
  request.post<any, BasicResponse>(API.ADD_SKU_INFO, skuInfo)

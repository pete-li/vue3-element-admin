import request from '@/utils/request'
import { SpuInfoResData } from '@/api/product/spu/type.ts'

enum API {
  GET_SPU_INFO = '/admin/product',
}

export const reqGetSpuInfo = (page, limit, category3Id) =>
  request.get<any, SpuInfoResData>(
    `${API.GET_SPU_INFO}/${page}/${limit}?category3Id=${category3Id}`,
  )

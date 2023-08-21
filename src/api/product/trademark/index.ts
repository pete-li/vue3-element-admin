import request from '@/utils/request'
import { TradeMark, TradeMarkResData } from './type'
import BasicResponse from '@/api/base_type.ts'

enum API {
  GET_TM = '/admin/product/baseTrademark',
  ADD_TM = '/admin/product/baseTrademark/save',
  UPDATE_TM = '/admin/product/baseTrademark/update',
  REMOVE_TM = '/admin/product/baseTrademark/remove',
}

export const reqGetTradeMark = (page: number, limit: number) =>
  request.get<any, TradeMarkResData>(`${API.GET_TM}/${page}/${limit}`)

export const reqAddOrUpdateTradeMark = (data: TradeMark) => {
  if (data.id) {
    // 修改需要id
    return request.put<any, BasicResponse>(API.UPDATE_TM, data)
  } else {
    // 添加不需要 点击添加的时候id已经初始化合并为空
    return request.post<any, BasicResponse>(API.ADD_TM, data)
  }
}

export const reqRemoveTradeMark = (id: number) =>
  request.delete<any, BasicResponse>(`${API.REMOVE_TM}/${id}`)

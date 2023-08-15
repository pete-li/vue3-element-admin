import request from '@/utils/request'
import { TradeMark, TradeMarkResData } from './type'

enum API {
  GET_TM = '/admin/product/baseTrademark',
  ADD_TM = '/admin/product/baseTrademark/save',
  UPDATE_TM = '/admin/product/baseTrademark/update',
  REMOVE_TM = '/admin/product/baseTrademark/remove',
}

export const reqGetTradeMark = (page: number, limit: number) =>
  request.get<any, TradeMarkResData>(`${API.GET_TM}/${page}/${limit}`)

export const reqAddOrUpdateTradeMark = (data: TradeMark) => {
  console.log(data)

  if (data.id) {
    // 修改需要id
    return request.put<any, any>(API.UPDATE_TM, data)
  } else {
    // 添加不需要
    return request.post<any, any>(API.ADD_TM, data)
  }
}

export const reqRemoveTradeMark = (id: number) =>
  request.delete<any, any>(`${API.REMOVE_TM}/${id}`)

import BasicResponse from '@/api/base_type'

export interface TradeMark {
  id?: number
  tmName: string
  logoUrl: string
}

// 所有品牌数据列表响应数据
export interface AllTradeMarListResData extends BasicResponse {
  data: TradeMark[]
}

// 品牌的响应数据（页码）
export interface TradeMarkResData extends BasicResponse {
  data: {
    records: TradeMark[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: false
    countId: number
    maxLimit: number
    searchCount: boolean
    pages: number
  }
}

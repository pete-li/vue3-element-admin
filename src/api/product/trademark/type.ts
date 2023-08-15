import basicResponse from '@/api/base_type'

export interface TradeMark {
  id?: number
  tmName: string
  logoUrl: string
}

// 品牌的响应数据
export interface TradeMarkResData extends basicResponse {
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

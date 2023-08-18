import basicResponse from '@/api/base_type'

export interface SpuInfo {
  id?: number
  spuName: string
  description: string
  category3Id?: number
  tmId?: number
  spuSaleAttrList?: []
  spuImageList?: []
  spuPosterList?: []
}
export interface SpuInfoResData extends basicResponse {
  data: {
    records: SpuInfo[]
    total: number
    size: number
    current: number
    pages: number
  }
}

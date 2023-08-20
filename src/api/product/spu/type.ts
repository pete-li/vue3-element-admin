import basicResponse from '@/api/base_type'

// spu销售属性
export interface SpuSaleAttr {
  id: number
  spuId: number
  hashMapString: string //收集销售属性id和销售属性值id的键值对字符串(用分隔符)
  baseSaleAttrId: number
  saleAttrName: string
  spuSaleAttrValueList: SpuSaleAttrValue[]
}

// spu销售属性值
export interface SpuSaleAttrValue {
  id: number
  spuId: number
  baseSaleAttrId: number
  saleAttrValueName: string
  saleAttrName: string
  isChecked: boolean
}

// 销售属性值响应数据
export interface SaleAttrValueResData extends basicResponse {
  data: SpuSaleAttr[]
}

// spu图片
export interface SpuImage {
  id: number
  spuId: number
  imgName: string
  imgUrl: string
}

// spp图片列表响应数据
export interface SpuImgListResData extends basicResponse {
  data: SpuImage[]
}

// spu基本信息
export interface SpuInfo {
  id?: number | undefined
  tmId?: number
  spuName: string
  description: string
  category3Id?: number
  spuSaleAttrList?: SpuSaleAttr[]
  spuImageList?: SpuImage[]
  spuPosterList?: []
}

// spu信息页码响应数据
export interface SpuInfoPageNumResData extends basicResponse {
  data: {
    records: SpuInfo[]
    total: number
    size: number
    current: number
    pages: number
  }
}

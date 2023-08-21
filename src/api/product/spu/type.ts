import BasicResponse from '@/api/base_type'

// spu销售属性
export interface SpuSaleAttr {
  id?: number
  spuId?: number
  hashMapString?: string //收集销售属性id和销售属性值id的键值对字符串(用分隔符)
  baseSaleAttrId: number | string
  saleAttrName: string
  spuSaleAttrValueList: SpuSaleAttrValue[]
  isInput?: boolean //是否输入模式
  saleAttrValue?: string | undefined //输入框绑定值
}

// 基础销售属性（用于选择器）
export interface baseSaleAttr {
  id: number | string
  name: string
}

// spu销售属性值
export interface SpuSaleAttrValue {
  id?: number
  spuId?: number
  baseSaleAttrId?: number | string
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: boolean
}

// 销售属性值响应数据
export interface SaleAttrValueResData extends BasicResponse {
  data: SpuSaleAttr[]
}

// spu图片
export interface SpuImage {
  id?: number
  spuId?: number
  imgName?: string
  imgUrl?: string
  name?: string
  url?: string
}

// spp图片列表响应数据
export interface SpuImgListResData extends BasicResponse {
  data: SpuImage[]
}

// spu基本信息
export interface SpuInfo {
  id?: number
  tmId: number | string
  spuName: string
  description: string
  category3Id: number | string
  spuSaleAttrList: SpuSaleAttr[]
  spuImageList: SpuImage[]
  spuPosterList?: []
}

// spu信息页码响应数据
export interface SpuInfoPageNumResData extends BasicResponse {
  data: {
    records: SpuInfo[]
    total: number
    size: number
    current: number
    pages: number
  }
}

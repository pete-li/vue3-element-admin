import BasicResponse from '../../base_type'

// 平台属性值
export interface SkuAttrValue {
  id?: number
  attrId: number | string //平台属性的ID
  valueId: number | string //属性值的ID
  skuId?: number | string
  attrName?: string
  valueName?: string
}

// 销售属性值
export interface skuSaleAttrValue {
  id?: number
  saleAttrId: number | string //销售属性ID
  saleAttrValueId: number | string //销售属性值的ID
  skuId?: number
  spuId?: number
  saleAttrName?: string
  saleAttrValueName?: string
}

// sku照片
export interface skuImg {
  id?: number
  skuId: number
  spuImgId: number
  imgName: string
  imgUrl: string
  isDefault: string
}

// sku信息
export interface SkuInfo {
  id?: number
  spuId: number ////已有的SPU的ID
  price: number | string //sku价格
  skuName: string //sku名字
  skuDesc: string //sku的描述
  weight: string //sku重量
  tmId: number //SPU品牌的ID
  category3Id: number //三级分类的ID
  skuDefaultImg: string //sku图片地址
  isSale?: number
  skuImageList?: skuImg[] //sku照片
  skuAttrValueList?: SkuAttrValue[] // 平台属性
  skuSaleAttrValueList?: skuSaleAttrValue[] // 销售属性
}

// sku列表响应信息(通过页码)
export interface SkuListByPageResData extends BasicResponse {
  data: {
    records: SkuInfo[]
    total: number
    size: number
    current: number
    orders: []
    hitCount: boolean
    pages: number
  }
}

// sku详情响应信息(通过id)
export interface SkuDetailByIdResData extends BasicResponse {
  data: SkuInfo
}

// sku列表响应信息(通过id)
export interface SkuListByIdResData extends BasicResponse {
  data: SkuInfo[]
}

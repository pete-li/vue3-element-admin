import BasicResponse from '../../base_type'

export interface SkuAttrValue {
  attrId: number | string //平台属性的ID
  valueId: number | string //属性值的ID
}

export interface skuSaleAttrValue {
  saleAttrId: number | string //销售属性ID
  saleAttrValueId: number | string //销售属性值的ID
}

// sku信息
export interface SkuInfo {
  id?: number
  category3Id: number //三级分类的ID
  spuId: number ////已有的SPU的ID
  tmId: number //SPU品牌的ID
  skuName: string //sku名字
  price: number | string //sku价格
  weight: string //sku重量
  skuDesc: string //sku的描述
  skuDefaultImg: string //sku图片地址
  skuAttrValueList?: SkuAttrValue[] // 平台属性
  skuSaleAttrValueList?: skuSaleAttrValue[] // 销售属性
  skuImageList?: []
  isSale?: number
}

// sku列表响应信息
export interface SkuListResData extends BasicResponse {
  data: SkuInfo[]
}

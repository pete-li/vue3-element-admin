<template>
  <el-card style="margin: 16px 0">
    <!-- 表格 -->
    <el-table style="width: 100%" :data="skuInfoList" border>
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80px"
        fixed
      ></el-table-column>
      <el-table-column
        label="名称"
        show-overflow-tooltip
        width="180px"
        prop="skuName"
      ></el-table-column>
      <el-table-column
        label="描述"
        show-overflow-tooltip
        width="300px"
        prop="skuDesc"
      ></el-table-column>
      <el-table-column align="center" label="图片" width="180">
        <template #default="{ row }">
          <img
            :src="row.skuDefaultImg"
            alt="图片丢失了"
            style="width: 100px; height: 100px; object-fit: contain"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="重量(g)"
        width="150px"
        prop="weight"
      ></el-table-column>
      <el-table-column
        label="价格(元)"
        width="150px"
        prop="price"
      ></el-table-column>
      <el-table-column label="操作" fixed="right" width="450px">
        <template #default="{ row }">
          <el-button
            size="small"
            :icon="row.isSale ? 'Bottom' : 'Top'"
            :title="row.isSale ? '下架商品' : '上架商品'"
            @click="shelvesBtHandler(row)"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            title="修改sku"
            @click="editBtHandler"
          ></el-button>
          <el-button
            type="info"
            size="small"
            icon="InfoFilled"
            title="信息详情"
            @click="viewSkuInfoDetail(row)"
          ></el-button>
          <el-popconfirm
            :title="`你确定要删除${row.skuName}`"
            width="200px"
            @confirm="deleteBtHandler(row)"
          >
            <template #reference>
              <el-button
                type="danger"
                title="删除sku"
                size="small"
                icon="Delete"
              ></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="curPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20, 30, 40]"
      background
      layout="prev, pager, next, jumper, ->, sizes, total"
      style="margin-top: 16px"
      :total="total"
      @current-change="currentChangeHandler"
      @size-change="sizeChangeHandler"
    />
    <!-- 商品详情抽屉 -->
    <el-drawer v-model="isShowDrawer">
      <template #header>
        <span>商品详情</span>
      </template>
      <template #default>
        <el-row style="margin: 10px 0">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfoDetail.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfoDetail.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfoDetail.price }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="skuAttrVal in skuInfoDetail.skuAttrValueList"
              :key="skuAttrVal.id"
              style="margin: 0 8px 8px 0"
            >
              {{ skuAttrVal.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="skuSaleAttrVal in skuInfoDetail.skuSaleAttrValueList"
              :key="skuSaleAttrVal.id"
              style="margin: 0 8px 8px 0"
            >
              {{ skuSaleAttrVal.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item
                v-for="skuImg in skuInfoDetail.skuImageList"
                :key="skuImg.id"
              >
                <img
                  :src="skuImg.imgUrl"
                  alt="图片已丢失"
                  style="width: 100%; height: 100%"
                />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  reqCancelSale,
  reqDeleteSkuInfo,
  reqGetSkuDetailById,
  reqGetSkuListByPage,
  reqOnSale,
} from '@/api/product/sku'
import { SkuInfo } from '@/api/product/sku/type.ts'
import { ElMessage } from 'element-plus'

const curPage = ref(1)
const pageSize = ref(5)
const total = ref(0)
const isShowDrawer = ref(false)
let skuInfoList = ref<SkuInfo[]>([])
let skuInfoDetail = ref<SkuInfo>({
  category3Id: 0,
  price: 0,
  skuDefaultImg: '',
  skuDesc: '',
  skuName: '',
  spuId: 0,
  tmId: 0,
  weight: '',
})

// 处理查看信息详情
async function viewSkuInfoDetail(row: SkuInfo) {
  const res = await reqGetSkuDetailById(row.id!)
  if (res.code === 200) {
    skuInfoDetail.value = res.data
  }

  isShowDrawer.value = true
}

// 处理删除
async function deleteBtHandler(row: SkuInfo) {
  const res = await reqDeleteSkuInfo(row.id!)
  if (res.code === 200) {
    await refreshSkuListData()
    ElMessage.success({
      message: '删除成功',
    })
    row.isSale = Number(!row.isSale)
  }
}

// 处理上下架按钮
async function shelvesBtHandler(row: SkuInfo) {
  const res = row.isSale
    ? await reqCancelSale(row.id!)
    : await reqOnSale(row.id!)
  if (res.code === 200) {
    ElMessage.success({
      message: row.isSale ? '下架成功！' : '上架成功！',
    })
    row.isSale = Number(!row.isSale)
  }
}

// 处理编辑按钮
function editBtHandler() {
  ElMessage({
    type: 'warning',
    message: '敬请期待！',
  })
}

// 页码改变处理
const currentChangeHandler = async () => {
  await refreshSkuListData()
}

// 页数限制改变处理
const sizeChangeHandler = async () => {
  await refreshSkuListData()
}

onMounted(() => {
  refreshSkuListData()
})

// 刷新SKU列表数据
const refreshSkuListData = async () => {
  const res = await reqGetSkuListByPage(curPage.value, pageSize.value)
  if (res.code === 200) {
    skuInfoList.value = res.data.records
    total.value = res.data.total
  }
}
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

<script lang="ts">
export default {
  name: 'sku',
}
</script>

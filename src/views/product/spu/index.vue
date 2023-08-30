<template>
  <div>
    <!-- 分类组件 -->
    <Category :scene="scene"></Category>

    <!-- 场景0：展示面板 -->
    <el-card v-show="scene === 0">
      <!-- 添加SPU按钮 -->
      <el-button
        @click="addSpuBtHandler"
        :disabled="!categoryStore.c3Id"
        type="primary"
        size="default"
        icon="Plus"
      >
        添加SPU
      </el-button>
      <!-- 表格 -->
      <el-table style="margin: 16px 0" :data="spuInfoList" border>
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="spuName" label="SPU名称" />
        <el-table-column prop="description" label="SPU描述"></el-table-column>
        <el-table-column label="SPU操作">
          <template #default="{ row }">
            <el-button
              size="small"
              title="添加SKU"
              icon="Plus"
              @click="addSkuBtHandler(row.id)"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              title="修改SPU"
              icon="Edit"
              @click="editSpuBtHandler(row)"
            ></el-button>
            <el-button
              type="info"
              icon="View"
              title="查看SKU列表"
              size="small"
              @click="viewSpuBtHandler(row.id)"
            ></el-button>
            <el-popconfirm
              :title="`确定要删除“${row.spuName}”吗?`"
              width="250px"
              icon="delete"
              @confirm="deleteSpuBtHandler(row.id)"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="curPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        background
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </el-card>

    <!-- sku列表对话框 -->
    <el-dialog v-model="dialogTableVisible" title="SKU列表">
      <el-table :data="skuInfoList" border>
        <el-table-column property="skuName" label="SKU名字" />
        <el-table-column property="price" label="SKU价格" />
        <el-table-column property="weight" label="SKU重量" />
        <el-table-column label="SKU图片">
          <template #default="{ row }">
            <img
              :src="row.skuDefaultImg"
              alt="图片丢失了"
              style="width: 100px; height: 100px; object-fit: contain"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 场景1：添加SKU面板 -->
    <SkuForm
      ref="skuFormRef"
      :scene="scene"
      @cancel="scene = 0"
      @save="scene = 0"
    ></SkuForm>

    <!-- 场景2：添加/编辑SPU面板 -->
    <SpuForm
      ref="spuFormRef"
      :scene="scene"
      @cancel="scene = 0"
      @save="saveSpuHandler"
    ></SpuForm>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/store/modules/category'
import { onBeforeUnmount, ref, watch } from 'vue'
import { reqDeleteSpuInfo, reqGetSpuInfo } from '@/api/product/spu'
import Category from '@/components/Category/index.vue'
import { SpuInfo } from '@/api/product/spu/type.ts'
import SkuForm from '@/views/product/spu/components/SkuForm.vue'
import SpuForm from '@/views/product/spu/components/SpuForm.vue'
import { SkuInfo } from '@/api/product/sku/type.ts'
import { ElMessage } from 'element-plus'
import { reqGetSkuListById } from '@/api/product/sku'

const categoryStore = useCategoryStore()
const curPage = ref(1)
const pageSize = ref(3)
const total = ref(0)
const scene = ref(0) // 0:展示面板 1:添加sku面板 2:添加/修改spu面板
const dialogTableVisible = ref(false)
const spuInfoList = ref<SpuInfo[]>([])
const skuInfoList = ref<SkuInfo[]>([])
const skuFormRef = ref() //skuForm组件实例
const spuFormRef = ref()

// 在保存spu的时候 切换场景并且更新数据
const saveSpuHandler = async () => {
  scene.value = 0
  await refreshSpuInfo()
}

// 处理删除spu信息
const deleteSpuBtHandler = async (spuId: number) => {
  let res = await reqDeleteSpuInfo(spuId)
  if (res.code === 200) {
    await refreshSpuInfo()
    ElMessage({
      type: 'success',
      message: '删除成功！',
    })
  }
}

// 处理查看spu列表
const viewSpuBtHandler = async (spuId: number) => {
  let res = await reqGetSkuListById(spuId)
  if (res.code === 200) {
    skuInfoList.value = res.data
  }
  dialogTableVisible.value = true
}

// 处理添加sku
const addSkuBtHandler = (spuId: number) => {
  skuFormRef.value.initSkuFormData(spuId) //通过ref拿到引用实例调用初始化函数
  scene.value = 1
}

// 处理修改spu
const editSpuBtHandler = (spu: SpuInfo) => {
  spuFormRef.value.initSpuPresetData(spu)
  scene.value = 2
}

// 处理添加spu
const addSpuBtHandler = () => {
  spuFormRef.value.initSpuPresetData()
  scene.value = 2
}

// 监听c3Id刷新spuInfo数据
watch(
  () => categoryStore.c3Id,
  async () => {
    await refreshSpuInfo()
  },
)

// 网络请求进行刷新spuInfo数据
const refreshSpuInfo = async () => {
  let res = await reqGetSpuInfo(
    curPage.value,
    pageSize.value,
    categoryStore.c3Id,
  )
  if (res.code === 200) {
    spuInfoList.value = res.data.records
    total.value = res.data.total
  }
}

// 分页器页限制值改变
const sizeChange = async () => {
  await refreshSpuInfo()
}

// 页码改变
const currentChange = async () => {
  await refreshSpuInfo()
}

// 销毁前重置分类残仓库数据 防止切换路由上一次的数据还在
onBeforeUnmount(() => {
  categoryStore.$reset()
})

/*// 测试代码 （用于自动选取分级选择器，不用自己点）
onMounted(async () => {
  categoryStore.c1Id = 2
  await categoryStore.getC2()
  categoryStore.c2Id = 13
  await categoryStore.getC3()
  categoryStore.c3Id = 61
})*/
</script>

<style lang="scss" scoped></style>

<script lang="ts">
export default {
  name: 'spu',
}
</script>

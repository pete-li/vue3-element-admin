<template>
  <div>
    <!-- 分类组件 -->
    <Category :scene="scene"></Category>

    <!-- sku列表对话框 -->
    <el-dialog v-model="dialogTableVisible" title="SKU列表">
      <el-table
        :data="[
          { skuName: 'aa', skuPrice: 111, skuWeight: 1.0, skuImg: 'logo.png' },
        ]"
        border
      >
        <el-table-column property="skuName" label="SKU名字" />
        <el-table-column property="skuPrice" label="SKU价格" />
        <el-table-column property="skuWeight" label="SKU重量" />
        <el-table-column label="SKU图片">
          <template #default="{ row }">
            <img
              :src="row.skuImg"
              alt="skuImg"
              style="width: 100px; height: 100px; object-fit: contain"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 场景1：展示面板 -->
    <el-card v-show="scene === 0">
      <!-- 添加SPU按钮 -->
      <el-button
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
              @click="addSkuHandler"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              title="修改SPU"
              icon="Edit"
              @click="editSpuHandler"
            ></el-button>
            <el-button
              type="info"
              icon="View"
              title="查看SKU列表"
              size="small"
              @click="dialogTableVisible = true"
            ></el-button>
            <el-popconfirm
              :title="`确定要删除“${row.tmName}”吗?`"
              width="250px"
              icon="delete"
              @confirm="row.id"
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

    <!-- 场景2：添加SKU面板 -->
    <el-card v-show="scene === 1">
      <!-- 设置label-width可以保证标签对齐 -->
      <el-form label-width="100px">
        <el-form-item label="SKU名称">
          <el-input placeholder="请输入SKU名称"></el-input>
        </el-form-item>
        <el-form-item label="价格(元)">
          <el-input placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="重量(g)">
          <el-input placeholder="请输入重量"></el-input>
        </el-form-item>
        <el-form-item label="SKU描述">
          <el-input type="textarea" placeholder="请输入SKU描述"></el-input>
        </el-form-item>
        <el-form-item label="平台属性">
          <el-form inline label-width="60px">
            <el-form-item
              v-for="(item, index) in [1, 2, 3]"
              :key="index"
              label="CPU"
              style="margin: 6px 0"
            >
              <el-select placeholder="请选择">
                <el-option :label="item" value="shanghai" />
              </el-select>
            </el-form-item>
          </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
          <el-form inline label-width="60px">
            <el-form-item
              v-for="(item, index) in [1, 2, 3]"
              :key="index"
              label="颜色"
              style="margin: 6px 0"
            >
              <el-select placeholder="请选择">
                <el-option :label="item" value="shanghai" />
              </el-select>
            </el-form-item>
          </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
          <el-table
            :data="[{ imgUrl: 'logo.png', imgName: 'logo.png' }]"
            style="width: 100%"
            border
          >
            <el-table-column type="selection" width="55" />
            <el-table-column label="图片" width="180">
              <template #default="{ row }">
                <img
                  :src="row.imgUrl"
                  alt="img"
                  style="width: 100px; height: 100px; object-fit: contain"
                />
              </template>
            </el-table-column>
            <el-table-column prop="imgName" label="名称" />
            <el-table-column label="操作">
              <template #default>
                <el-button type="primary" size="small">设置默认</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="default" @click="scene = 0">
        保存
      </el-button>
      <el-button size="default" @click="scene = 0">取消</el-button>
    </el-card>

    <!-- 场景3：添加/编辑SPU面板 -->
    <el-card v-show="scene === 2">
      <el-form label-width="100px">
        <el-form-item label="SPU名称">
          <el-input placeholder="请输入SPU名称"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
          <el-select placeholder="请选择">
            <el-option label="zone one" value="shanghai" />
          </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
          <el-input type="textarea" placeholder="请输入SPU描述"></el-input>
        </el-form-item>
        <el-form-item label="SPU图标">
          <template #default>
            <el-upload
              v-model:file-list="fileList"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
              <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
          </template>
        </el-form-item>
        <el-form-item label="SPU销售属性">
          <el-select placeholder="还未选择xx个">
            <el-option label="zone one" value="shanghai" />
          </el-select>
          <el-button style="margin-left: 16px" type="primary" icon="Plus">
            添加属性
          </el-button>
          <el-table
            :data="[{ name: 'logo.png' }]"
            style="margin: 16px 0"
            border
          >
            <el-table-column type="index" width="55" />
            <el-table-column prop="name" label="SPU销售属性名称" />
            <el-table-column label="SPU销售属性值" width="180">
              <template #default>
                <el-tag closable style="margin: 0 6px">黑色</el-tag>
                <el-button size="small" icon="Plus"></el-button>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template #default>
                <el-button type="danger" size="small" icon="Delete"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="default" @click="scene = 0">
        保存
      </el-button>
      <el-button size="default" @click="scene = 0">取消</el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/store/modules/category'
import { onBeforeUnmount, ref, watch } from 'vue'
import { reqGetSpuInfo } from '@/api/product/spu'
import Category from '@/components/Category/index.vue'
import { SpuInfo } from '@/api/product/spu/type.ts'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps, UploadUserFile } from 'element-plus'

const categoryStore = useCategoryStore()
const curPage = ref(1)
const pageSize = ref(3)
const total = ref(0)
const scene = ref(0) // 0:展示面板 1:添加sku面板 2:添加/修改spu面板
const spuInfoList = ref<SpuInfo[]>([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const dialogTableVisible = ref(false)

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
])

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

// 处理添加sku
const addSkuHandler = () => {
  scene.value = 1
}

// 处理修改spu
const editSpuHandler = () => {
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

onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<style lang="scss" scoped></style>

<script lang="ts">
export default {
  name: 'spu',
}
</script>

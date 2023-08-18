<template>
  <div>
    <Category></Category>
    <el-card style="margin-top: 32px">
      <!-- 添加SPU按钮 -->
      <el-button type="primary" size="default" icon="Plus">添加SPU</el-button>
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
              @click="row"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              title="修改SPU"
              icon="Edit"
              @click="row"
            ></el-button>
            <el-button
              type="info"
              icon="View"
              title="查看SKU列表"
              size="small"
              @click="row"
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
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/store/modules/category'
import { onBeforeUnmount, reactive, ref } from 'vue'

const category = useCategoryStore()
const curPage = ref(1)
const pageSize = ref(3)
const total = ref(0)
const spuInfoList = reactive([])

onBeforeUnmount(() => {
  category.$reset()
})
</script>

<style lang="scss" scoped></style>

<script lang="ts">
export default {
  name: 'spu',
}
</script>

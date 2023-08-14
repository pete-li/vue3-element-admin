<template>
  <el-card class="box-card">
    <!-- 添加商品按钮 -->
    <el-button type="primary" size="default" @click="addTradeMark" icon="Plus">
      添加商品
    </el-button>
    <!-- 表格 -->
    <el-table style="margin: 16px 0" :data="tableData" border>
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="tmName" label="品牌名称" />
      <el-table-column prop="logoUrl" label="品牌logo">
        <!-- 插槽会传值scope 其中有index和row数据通过解构赋值获得 -->
        <template #default="{ row }">
          <img
            :src="row.logoUrl"
            alt="图片找不到了"
            style="width: 100px; height: 100px; object-fit: contain"
          />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateTradeMark(row)"
          ></el-button>
          <el-popconfirm
            :title="`确定要删除“${row.tmName}”吗?`"
            width="250px"
            icon="delete"
          >
            <template #reference>
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="deleteTradeMark(row.id)"
              ></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="page"
      v-model::page-size="pageSize"
      :page-sizes="[3, 5, 7, 9]"
      background
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const page = ref(1)
const pageSize = ref(3)
const total = ref(1000)

const addTradeMark = () => {
  console.log(111)
}

const updateTradeMark = (row: any) => {
  console.log(row)
}

const deleteTradeMark = (id: number) => {
  console.log(id)
}

const tableData = [
  {
    id: 1,
    createTime: '2021-12-10 01:31:41',
    updateTime: '2023-04-15 15:48:02',
    tmName: '小米',
    logoUrl:
      '39.98.123.211/group1/M00/03/D9/rBHu8mHmKC6AQ-j2AAAb72A3EO0942.jpg',
  },
  {
    id: 2,
    createTime: '2021-12-10 01:31:41',
    updateTime: '2023-04-15 15:48:21',
    tmName: '苹果',
    logoUrl:
      'http://39.98.123.211/group1/M00/03/D9/rBHu8mHmKHOADErHAAAQBezsFBo612.jpg',
  },
  {
    id: 3,
    createTime: '2021-12-10 01:31:41',
    updateTime: '2023-04-15 15:48:28',
    tmName: '华为',
    logoUrl:
      'http://39.98.123.211/group1/M00/03/D9/rBHu8mHmKF2AWpcKAADv98DWYRo516.jpg',
  },
]
</script>

<style lang="scss" scoped></style>

<script lang="ts">
export default {
  name: 'trademark',
}
</script>

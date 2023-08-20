<template>
  <el-card style="margin: 16px 0">
    <el-table style="width: 100%" :data="[]" border>
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
        width="150px"
        prop="skuName"
      ></el-table-column>
      <el-table-column
        label="描述"
        show-overflow-tooltip
        width="350px"
        prop="skuDesc"
      ></el-table-column>
      <el-table-column label="图片" width="250px">
        <template #default="{ row }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 100px; height: 100px"
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
            :icon="row.isSale === 1 ? 'Bottom' : 'Top'"
            @click="row"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="row"
          ></el-button>
          <el-button
            type="info"
            size="small"
            icon="InfoFilled"
            @click="row"
          ></el-button>
          <el-popconfirm
            :title="`你确定要删除${row.skuName}`"
            width="200px"
            @confirm="row"
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
      :page-sizes="[10, 20, 30, 40]"
      background
      layout="prev, pager, next, jumper, ->, sizes, total"
      style="margin-top: 16px"
      :total="total"
    />
    <!--<el-drawer v-model="curPage">
      <template #header>
        <h4>查看商品的详情</h4>
      </template>
      <template #default>
        <el-row style="margin: 10px 0">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin: 5px"
              v-for="item in skuInfo.skuAttrValueList"
              :key="item.id"
            >
              {{ item.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin: 5px"
              v-for="item in skuInfo.skuSaleAttrValueList"
              :key="item.id"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item
                v-for="item in skuInfo.skuImageList"
                :key="item.id"
              >
                <img
                  :src="item.imgUrl"
                  alt=""
                  style="width: 100%; height: 100%"
                />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>-->
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const curPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
</script>

<style lang="scss" scoped></style>

<script lang="ts">
export default {
  name: 'sku',
}
</script>

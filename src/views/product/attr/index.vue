<template>
  <div>
    <!-- 三级分类 -->
    <category :ctgForm="ctgForm"></category>

    <!-- 属性CURD -->
    <el-card class="attr" style="margin-top: 32px">
      <!-- 表格场景 -->
      <div class="table-scene" v-show="scene === 0">
        <el-button type="primary" :icon="Plus" @click="scene = 1">
          添加平台属性
        </el-button>
        <el-table style="margin: 16px 0" :data="arr" border>
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          />
          <el-table-column prop="attrName" label="属性名称" />
          <el-table-column prop="attrVal" label="属性值名称">
            <!-- 插槽会传值scope 其中有index和row数据通过解构赋值获得 -->
            <template #default="{ row }">
              <el-tag>{{ row.attrVal[0].value }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="属性操作">
            <template #default="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="scene = 1"
              ></el-button>
              <el-popconfirm
                :title="`确定要删除“${row.attrName}”吗?`"
                width="250px"
                icon="delete"
                @confirm="console.log(222)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    size="small"
                    icon="Delete"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 增改场景 -->
      <div class="add-update-scene" v-show="scene === 1">
        <el-form inline>
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" :icon="Plus" @click="scene = 1">
          添加属性值
        </el-button>
        <el-table style="margin: 16px 0" :data="arr" border>
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          />
          <el-table-column prop="attrName" label="属性值名称" />
          <el-table-column label="属性值操作">
            <template #default="{ row }">
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="row.id"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" size="default" @click="scene = 0">
          保存
        </el-button>
        <el-button size="default" @click="scene = 0">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

const scene = ref(0) //场景值 0：表格场景 1：增改场景

const arr = [
  {
    index: 0,
    attrName: 'aa',
    attrVal: [
      {
        value: 11,
      },
    ],
  },
]

const ctgForm = reactive({ c1: '' })
</script>

<style lang="scss" scoped></style>

<script lang="ts">
export default {
  name: 'attribute',
}
</script>

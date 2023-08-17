<template>
  <el-card class="category">
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryStore.c1Id"
          placeholder="请选择"
          @change="changeHandler(1)"
          :disabled="scene === 1"
        >
          <el-option
            v-for="c1 in categoryStore.c1ResArr"
            :label="c1.name"
            :value="c1.id"
            :key="c1.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="categoryStore.c2Id"
          placeholder="请选择"
          @change="changeHandler(2)"
          :disabled="scene === 1"
        >
          <el-option
            v-for="c2 in categoryStore.c2ResArr"
            :label="c2.name"
            :value="c2.id"
            :key="c2.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="categoryStore.c3Id"
          placeholder="请选择"
          @change="changeHandler(3)"
          :disabled="scene === 1"
        >
          <el-option
            v-for="c3 in categoryStore.c3ResArr"
            :label="c3.name"
            :value="c3.id"
            :key="c3.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/store/modules/category'
import { onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.getC1()
})

const changeHandler = async (cLevel: number) => {
  switch (cLevel) {
    case 1:
      categoryStore.c2Id = ''
      categoryStore.c3Id = ''
      categoryStore.c3ResArr = []
      categoryStore.attrInfoList = []
      await categoryStore.getC2()
      break
    case 2:
      categoryStore.c3Id = ''
      categoryStore.attrInfoList = []
      await categoryStore.getC3()
      break
    case 3:
      try {
        await categoryStore.refreshAttrInfoList()
      } catch (error: any) {
        // 此处服务器对某些分类会超时 做特别处理
        categoryStore.c3Id = ''
        ElMessage({
          type: 'error',
          message: error.message,
        })
      }
      break
  }
}
defineProps(['scene'])
</script>

<script lang="ts">
export default {
  name: 'Category',
}
</script>

<template>
  <el-card class="category">
    <el-form :model="ctgForm" inline>
      <el-form-item label="一级分类">
        <el-select v-model="ctgForm.c1" placeholder="请选择">
          <el-option label="分类1" value="数据1" />
          <el-option label="分类2" value="数据2" />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="ctgForm.c1" placeholder="请选择">
          <el-option label="分类1" value="数据1" />
          <el-option label="分类2" value="数据2" />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="ctgForm.c1" placeholder="请选择">
          <el-option label="分类1" value="数据1" />
          <el-option label="分类2" value="数据2" />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
defineProps({
  ctgForm: {
    type: Object,
    default: () => {
      return {
        ca: 11,
      }
    },
  },
})
</script>

<script lang="ts">
export default {
  name: 'Category',
}
</script>

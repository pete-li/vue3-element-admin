<template>
  <el-icon style="margin-left: 16px" @click="foldHandler">
    <component :is="isFold ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <el-breadcrumb class="breadcrumb" separator-icon="ArrowRight" separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">
      <el-icon>
        <User />
      </el-icon>
      <span style="margin-left: 6px">XX</span>
    </el-breadcrumb-item>
    <el-breadcrumb-item>
      <el-icon>
        <User />
      </el-icon>
      <span style="margin-left: 6px">XX</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let isFold = ref(false)
const foldHandler = () => {
  isFold.value = !isFold.value
}
</script>

<style scoped>
.breadcrumb {
  margin-left: 16px;
}
</style>

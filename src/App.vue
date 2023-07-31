<template>
  <el-row class="mb-4">
    <el-button type="success" :icon="Check">Success</el-button>
    <div class="demo-pagination-block">
      <el-pagination
        :page-size="100"
        layout="total, prev, pager, next"
        :background="ref(true)"
        :total="1000"
      />
    </div>
  </el-row>
</template>

<script lang="ts" setup>
import { Check } from '@element-plus/icons-vue'
import { ref } from 'vue'
</script>

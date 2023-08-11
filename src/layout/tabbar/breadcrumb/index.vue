<template>
  <el-icon class="fold-icon" @click="foldHandler" title="折叠菜单">
    <component :is="settingStore.isFold ? 'Expand' : 'Fold'"></component>
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
import useSettingStore from '@/store/modules/setting'
let settingStore = useSettingStore()
const foldHandler = () => {
  console.log(settingStore)
  settingStore.isFold = !settingStore.isFold
}
</script>

<style lang="scss" scoped>
.fold-icon {
  cursor: pointer;
}

.breadcrumb {
  margin-left: 16px;
}
</style>

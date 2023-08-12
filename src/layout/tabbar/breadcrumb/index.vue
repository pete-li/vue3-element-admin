<template>
  <!-- 折叠侧边栏图标 -->
  <el-icon class="fold-icon" @click="foldHandler">
    <component :is="settingStore.isFold ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <!-- 面包屑 -->
  <el-breadcrumb class="breadcrumb" separator-icon="ArrowRight" separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <!-- 首页是二级路由中只有一个，要用v-show特殊处理 不能用v-if 优先级比v-for高 -->
      <el-icon class="breadcrumb-icon">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span class="breadcrumb-title">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/modules/setting'
let settingStore = useSettingStore()
const foldHandler = () => {
  settingStore.isFold = !settingStore.isFold
}
</script>

<style lang="scss" scoped>
.fold-icon {
  cursor: pointer;
}

.breadcrumb {
  margin-left: 16px;

  .breadcrumb-icon {
    vertical-align: middle;
  }

  .breadcrumb-title {
    margin: 0 5px;
    vertical-align: middle;
  }
}
</style>

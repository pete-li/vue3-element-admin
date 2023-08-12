<template>
  <el-header class="layout_tabbar" :class="{ isFold: settingStore.isFold }">
    <div class="left">
      <breadcrumb></breadcrumb>
    </div>
    <div class="right">
      <setting></setting>
    </div>
  </el-header>
</template>

<script lang="ts" setup>
import breadcrumb from './breadcrumb/index.vue'
import setting from './setting/index.vue'
import useSettingStore from '@/store/modules/setting'

let settingStore = useSettingStore()
</script>

<style lang="scss" scoped>
.layout_tabbar {
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: calc(100% - $base-menu-width);
  height: $base-tabbar-height;
  top: 0;
  left: $base-menu-width;
  transition: all 0.5s;

  &.isFold {
    width: calc(100% - $base-menu-min-width);
    left: $base-menu-min-width;
  }
  .left {
    display: flex;
    align-items: center;
  }

  .right {
    display: flex;
    align-items: center;
  }
}
</style>

<script lang="ts">
export default {
  name: 'tabbar',
}
</script>

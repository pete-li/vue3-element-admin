<template>
  <el-aside class="slider-container" :class="{ isFold: settingStore.isFold }">
    <el-scrollbar>
      <Logo></Logo>
      <el-menu
        class="menu-container"
        background-color="#001529"
        text-color="white"
        default-active="/"
        :collapse="settingStore.isFold"
      >
        <Menu :menu-list="menuList"></Menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup lang="ts">
import Logo from '@/layout/logo/index.vue'
import Menu from '@/layout/menu/index.vue'

import useUserStore from '@/store/modules/user'
import useSettingStore from '@/store/modules/setting'
let userStore = useUserStore()
let settingStore = useSettingStore()
let menuList = userStore.menuRoutes
</script>

<style lang="scss" scoped>
.slider-container {
  width: $base-menu-width;
  height: 100vh;
  background-color: $base-menu-background;
  transition: all 0.5s;

  &.isFold {
    width: $base-menu-min-width;
  }
  .menu-container {
    border-right: 0;
  }
}
</style>

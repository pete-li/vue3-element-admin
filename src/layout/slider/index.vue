<template>
  <div class="layout_slider">
    <el-scrollbar>
      <Logo></Logo>
      <el-menu
        class="el-menu"
        background-color="#001529"
        text-color="white"
        default-active="/"
      >
        <Menu :menu-list="menuList"></Menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/layout/logo/index.vue'
import Menu from '@/layout/menu/index.vue'

import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
let menuList = userStore.menuRoutes
</script>

<style lang="scss" scoped>
.layout_slider {
  width: $base-menu-width;
  height: 100vh;
  background-color: $base-menu-background;

  .el-menu {
    border-right: 0;
  }
}
</style>

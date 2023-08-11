<template>
  <div class="layout_tabbar">
    <div class="left">
      <breadcrumb></breadcrumb>
    </div>
    <div class="right">
      <setting></setting>
    </div>
  </div>
</template>

<script lang="ts" setup>
import breadcrumb from './breadcrumb/index.vue'
import setting from './setting/index.vue'
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

  .left {
    display: flex;
    align-items: center;
  }

  .right {
    display: flex;
    align-items: center;
    margin-right: 16px;
  }
}
</style>

<template>
  <el-main class="layout_main" :class="{ isFold: settingStore.isFold }">
    <!-- 通过插槽把动画效果传递给router-view内部的组件 -->
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </el-main>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/modules/setting'

let settingStore = useSettingStore()
</script>

<style lang="scss" scoped>
.layout_main {
  position: absolute;
  width: calc(100% - $base-menu-width);
  height: calc(100% - $base-tabbar-height);
  background-color: skyblue;
  top: $base-tabbar-height;
  left: $base-menu-width;
  padding: 20px;
  overflow: auto;
  transition: all 0.5s;

  &.isFold {
    width: calc(100% - $base-menu-min-width);
    left: $base-menu-min-width;
  }
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>

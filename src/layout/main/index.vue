<template>
  <div class="layout_main">
    <!-- 通过插槽把动画效果传递给router-view内部的组件 -->
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>

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

<template>
  <el-main class="main_layout" :class="{ isFold: settingStore.isFold }">
    <router-view v-slot="{ Component }">
      <!-- 此处用作用域插槽将{Component}组件传递给父组件供程序员使用 -->
      <transition name="fade">
        <component :is="Component" v-if="!settingStore.isRefresh" />
      </transition>
    </router-view>
  </el-main>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/modules/setting'
import { nextTick, watch } from 'vue'

let settingStore = useSettingStore()
watch(
  () => settingStore.isRefresh,
  () => {
    nextTick(() => {
      //在下一次dom渲染更新的时候，也就是unmounted的时候 再让v-if开启
      settingStore.isRefresh = false
    })
  },
)
</script>

<style lang="scss" scoped>
.main_layout {
  position: absolute;
  width: calc(100% - $base-menu-width);
  height: calc(100% - $base-tabbar-height);
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
  transition: all 0.5s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>

<script lang="ts">
export default {
  name: 'mainPage',
}
</script>

<template>
  <el-button :icon="Refresh" size="small" @click="refreshHandler" circle />
  <el-button
    :icon="FullScreen"
    size="small"
    @click="fullScreenHandler"
    circle
  />
  <el-button :icon="Setting" size="small" circle />

  <img class="avatar" src="../../../../public/logo.png" alt="avatar" />
  <el-dropdown>
    <span class="el-dropdown-link">
      用户名
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import {
  Refresh,
  Setting,
  FullScreen,
  ArrowDown,
} from '@element-plus/icons-vue'
import useSettingStore from '@/store/modules/setting'
const settingStore = useSettingStore()

const refreshHandler = () => {
  settingStore.isRefresh = !settingStore.isRefresh
}

const fullScreenHandler = () => {
  let isFullScreen = document.fullscreenElement //如果没有这个元素说明目前没有全屏
  if (!isFullScreen) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 24px;
  height: 24px;
  border-radius: 20px;
  margin: 0 12px;
}
</style>

<script lang="ts">
export default {
  name: 'setting',
}
</script>

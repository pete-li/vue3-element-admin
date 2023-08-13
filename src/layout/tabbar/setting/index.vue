<template>
  <el-button :icon="Refresh" size="small" @click="refreshHandler" circle />
  <el-button
    :icon="FullScreen"
    size="small"
    @click="fullScreenHandler"
    circle
  />
  <el-button :icon="Setting" size="small" circle />

  <img class="avatar" :src="userStore.avatar" alt="avatar" />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logoutHandler">退出登录</el-dropdown-item>
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
import useUserStore from '@/store/modules/user'
import router from '@/router'
import { useRoute } from 'vue-router'

const settingStore = useSettingStore()
const userStore = useUserStore()
const route = useRoute()

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

const logoutHandler = async () => {
  await userStore.user_logout()
  router.push({ path: '/login', query: { redirect: route.path } })
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 20px;
  margin: 0 12px;
}
</style>

<script lang="ts">
export default {
  name: 'setting',
}
</script>

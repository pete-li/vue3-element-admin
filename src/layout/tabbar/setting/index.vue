<template>
  <el-button :icon="Refresh" size="small" @click="refreshHandler" circle />
  <el-button
    :icon="FullScreen"
    size="small"
    @click="fullScreenHandler"
    circle
  />

  <el-popover placement="bottom" title="主题设置" :width="200" trigger="hover">
    <el-form>
      <span style="margin-right: 12px">主题颜色</span>
      <el-color-picker
        size="small"
        v-model="color"
        :predefine="predefineColors"
        @change="themeColorChange"
        show-alpha
      />
      <el-form-item label="暗黑模式">
        <el-switch
          class="mt-2"
          v-model="isDarkTheme"
          inline-prompt
          :active-icon="Moon"
          :inactive-icon="Sunny"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button class="m-2" :icon="Setting" size="small" circle />
    </template>
  </el-popover>

  <img class="avatar" :src="userStore.avatar" alt="avatar" />
  <el-dropdown>
    <span class="el-dropdown-link" style="cursor: pointer">
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
import { onMounted, ref, watch } from 'vue'
import { Sunny, Moon } from '@element-plus/icons-vue'

const settingStore = useSettingStore()
const userStore = useUserStore()
const route = useRoute()

const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#409EFF',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const color = ref('')
const pickerRef = ref()

// 主题颜色发生改变
const themeColorChange = (value: string) => {
  color.value = value
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', value)
  localStorage.setItem('themeColor', value)
}

const isDarkTheme = ref<boolean>(false)

// 挂载的时候初始化用户偏好设置
onMounted(() => {
  isDarkTheme.value = JSON.parse(localStorage.getItem('isDarkTheme')!)
  color.value = localStorage.getItem('themeColor')! || '#409EFF'
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
})

// 监听暗黑模式是否改变
watch(
  () => isDarkTheme.value,
  (newVal) => {
    localStorage.setItem('isDarkTheme', `${newVal}`)
    const html = document.documentElement
    html.className = newVal ? 'dark' : ''
  },
)

// 刷新按钮处理
const refreshHandler = () => {
  settingStore.isRefresh = !settingStore.isRefresh
}

// 全屏按钮处理
const fullScreenHandler = () => {
  let isFullScreen = document.fullscreenElement //如果没有这个元素说明目前没有全屏
  if (!isFullScreen) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

// 退出登录处理
const logoutHandler = async () => {
  await userStore.user_logout()
  await router.push({ path: '/login', query: { redirect: route.path } })
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

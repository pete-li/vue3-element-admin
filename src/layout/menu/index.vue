<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 无子路由 -->
    <template v-if="!item.children && !item.meta.hidden">
      <el-menu-item :index="item.path" @click="goRoute(item.path)">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
    <!-- 有子路由且只有一个 -->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item
        :index="item.path"
        v-if="!item.children[0].meta.hidden"
        @click="goRoute(item.path)"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <span>{{ item.children[0].meta.title }}</span>
      </el-menu-item>
    </template>
    <!-- 有子路由且超过一个 -->
    <template v-if="item.children && item.children.length > 1">
      <el-sub-menu :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <Menu :menu-list="item.children"></Menu>
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
import Menu from '@/layout/menu/index.vue'
import { useRouter } from 'vue-router'

defineProps(['menuList'])
const router = useRouter()
const goRoute = (path: string) => {
  router.push(path)
}
</script>
<style lang="scss" scoped></style>

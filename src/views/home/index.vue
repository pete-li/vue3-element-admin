<template>
  <div class="admin-home">
    <el-card class="user-panel">
      <div style="display: flex">
        <img class="user-avatar" :src="userStore.avatar" alt="图片丢失了" />
        <div class="user-info">
          <p class="hello-name">{{ getTime() }}好~ {{ userStore.username }}</p>
          <p class="sub-title">vue3-element-admin</p>
        </div>
      </div>
    </el-card>
    <div class="bottom">
      <SvgIcon name="welcome" width="600px" height="300px"></SvgIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user.ts'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { getTime } from '@/utils/getTime.ts'

const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.admin-home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .user-panel {
    height: 200px;
    margin: 16px 16px 0 16px;

    .user-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-bottom: 30px;
    }

    .user-info {
      width: 100%;
      height: 100%;

      .hello-name {
        font-size: 35px;
        font-weight: 900;
        margin: 16px 0 16px 16px;
      }

      .sub-title {
        font-style: italic;
        color: #ccc;
        font-weight: 700;
        margin-left: 16px;
      }
    }
  }

  .bottom {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

<script lang="ts">
export default {
  name: 'home',
}
</script>

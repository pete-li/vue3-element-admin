<template>
  <div class="home-layout">
    <el-card>
      <div class="box">
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
.home-layout {
  .box {
    display: flex;

    .user-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }

    .user-info {
      margin-left: 20px;
      margin-top: 15px;

      .hello-name {
        font-size: 35px;
        font-weight: 900;
        margin-bottom: 30px;
      }

      .sub-title {
        font-style: italic;
        color: #ccc;
        font-weight: 700;
      }
    }
  }

  .bottom {
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }
}
</style>

<script lang="ts">
export default {
  name: 'home',
}
</script>

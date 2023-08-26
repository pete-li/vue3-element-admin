<template>
  <div class="box">
    <img
      class="error-404"
      src="../../assets/images/error_images/404.png"
      alt="图片丢失了"
      title="点击返回首页"
      @click="router.push('./')"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .error-404 {
    width: 500px;
    margin: 0 100px 50px 0;
    cursor: pointer;
  }
}
</style>

<script lang="ts">
export default {
  name: '404',
}
</script>

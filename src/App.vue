<template>
  <div>
    <h1>测试代码</h1>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { login } from '@/api/user'

onMounted(() => {
  login({
    username: 'admin',
    password: '123456',
  }).then((res) => {
    console.log(res)
  })
})
</script>

<style lang="scss" scoped>
div {
  h1 {
    color: $base-color;
  }
}
</style>

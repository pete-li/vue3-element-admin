<template>
  <div class="logo">
    <img :src="setting.logo" alt="logo" />
    <span>{{ setting.title }}</span>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting.ts'
</script>

<style lang="scss" scoped>
.logo {
  width: 90%;
  height: $base-menu-logo-height;
  display: flex;
  align-items: center;
  color: white;
  font-weight: 700;
  padding-left: 17px;
  flex-wrap: nowrap; /* 不允许换行 */
  overflow: hidden;

  img {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 10px;
  }

  span {
    display: inline-block;
    height: 32px;
    margin: 2px 0 0 18px;
    overflow: hidden;
    font-size: $base-logo-title-fontSize;
    font-weight: 600;
    line-height: 32px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>

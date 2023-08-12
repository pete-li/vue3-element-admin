<template>
  <svg class="icon" :style="{ width, height }">
    <use :xlink:href="`#icon-${name}`" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '16px',
  },
  height: {
    type: String,
    default: '16px',
  },
})
</script>

<script lang="ts">
export default {
  name: 'svgIcon',
}
</script>

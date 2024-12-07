<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>{{ title }}</span>

        <slot name="extra"></slot>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

<script setup>
import { ElCard, ElButton } from 'element-plus'
import { ref } from 'vue'
const Isdisplay = ref(false)
defineProps({
  title: {
    required: true,
    type: String,
    default: '标题',
  },
})
</script>

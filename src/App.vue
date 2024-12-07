<script setup>
import { useUserStore } from './stores/index'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const userStore = useUserStore()
</script>

<template>
  <div>
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<style scoped></style>

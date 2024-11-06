<script setup>
import { useUserStore } from './stores/index'

const userStore = useUserStore()
</script>

<template>
  <div>
    I am App
    <p>{{ userStore.token }}</p>
    <el-button @click="userStore.setToken('hahaha周子颜是我的性奴')"
      >登录</el-button
    >
    <el-button @click="userStore.removeToken">退出</el-button>
  </div>
</template>

<style scoped></style>

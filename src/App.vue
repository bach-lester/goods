<script setup>
import { useUserStore } from './stores/index'

const userStore = useUserStore()
</script>

<template>
  <div>
    <h1></h1>
    <h1></h1>
    <router-view></router-view>
    <h1></h1>
    <hr />
  </div>

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

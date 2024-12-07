<template>
  <page-container :title="'基本资料'">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="登录名称" prop="username">
        <el-input v-model="form.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交修改</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>

<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
import { userUpdateUserInfoService } from '@/api/user'

const userStore = useUserStore()

const formRef = ref()
const form = reactive({
  id: userStore.user.id, // 确保 id 字段被正确初始化
  username: userStore.user.username,
  nickname: userStore.user.nickname,
  email: userStore.user.email,
})

const rules = reactive({
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change'],
    },
  ],
})

const submitForm = async () => {
  try {
    await formRef.value.validate(async valid => {
      if (valid) {
        // 提交表单数据到后端
        await userUpdateUserInfoService(form)
        userStore.getUser() // 更新用户信息
        ElMessage.success('修改成功')
      } else {
        ElMessage.error('验证失败')
      }
    })
  } catch (error) {
    console.error('提交表单失败:', error)
    ElMessage.error('提交表单失败')
  }
}

onMounted(() => {
  userStore.getUser() // 在组件挂载时获取用户信息
})
</script>

<style scoped>
/* 你可以在这里添加样式 */
</style>

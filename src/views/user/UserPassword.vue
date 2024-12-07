<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { userUpdatePasswordService } from '@/api/user'
import { useUserStore } from '@/stores'
import router from '@/router'

const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: '',
})
const userStore = useUserStore()
const formRef = ref(null)

const validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (value.length < 6 || value.length > 15) {
    callback(new Error('密码长度必须在6-15位之间'))
  } else {
    if (pwdForm.value.new_pwd !== '' && !formRef.value) {
      formRef.value.validateField('re_pwd', () => null)
    }
    callback()
  }
}

const validateNewPassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入新密码'))
  } else if (value.length < 6 || value.length > 15) {
    callback(new Error('新密码长度必须在6-15位之间'))
  } else if (value === pwdForm.value.old_pwd) {
    callback(new Error('新密码不能与原密码相同'))
  } else {
    callback()
  }
}

const validateRePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入新密码'))
  } else if (value.length < 6 || value.length > 15) {
    callback(new Error('确认密码长度必须在6-15位之间'))
  } else if (value !== pwdForm.value.new_pwd) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const rules = {
  old_pwd: [{ validator: validatePassword, trigger: 'blur' }],
  new_pwd: [{ validator: validateNewPassword, trigger: 'blur' }],
  re_pwd: [{ validator: validateRePassword, trigger: 'blur' }],
}

const submitForm = async () => {
  await formRef.value.validate()
  await userUpdatePasswordService(pwdForm.value)
  ElMessage.success('密码修改成功')
  userStore.setToken('')
  userStore.setUser({})

  router.push('/login')
}

const resetForm = () => {
  formRef.value.resetFields()
}
</script>

<template>
  <page-container title="修改密码">
    <el-form :model="pwdForm" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="原密码" prop="old_pwd">
        <el-input
          v-model="pwdForm.old_pwd"
          type="password"
          placeholder="请输入原密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input
          v-model="pwdForm.new_pwd"
          type="password"
          placeholder="请输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="re_pwd">
        <el-input
          v-model="pwdForm.re_pwd"
          type="password"
          placeholder="请再次输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">修改密码</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>

<style scoped>
.el-form-item {
  margin-bottom: 20px;
}
</style>

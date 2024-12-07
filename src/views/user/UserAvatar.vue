<script lang="ts" setup>
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { userUpdateAvatarService } from '@/api/user'

const userStore = useUserStore()
console.log(userStore.user)
const imageUrl = ref(userStore.user.user_pic)
const uploadRef = ref()
const onSelectFile = file => {
  // imageUrl.value = URL.createObjectURL(file.raw)
  //基于Fliereader预览
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    imageUrl.value = reader.result
  }
}
const onUpload = async () => {
  //上传图片
  await userUpdateAvatarService(imageUrl.value)
  await userStore.getUser()
  ElMessage.success('上传成功')
}
</script>

<template>
  <page-container title="更换头像">
    <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      :auto-upload="false"
      ref="uploadRef"
      :on-change="onSelectFile"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <br />
    <br />
    <el-button
      @click="uploadRef.$el.querySelector('input').click()"
      type="primary"
      :icon="Plus"
      size="largr"
      >选择头像</el-button
    >
    <el-button type="success" :icon="Upload" size="largr" @click="onUpload"
      >上传头像</el-button
    >
  </page-container>
</template>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

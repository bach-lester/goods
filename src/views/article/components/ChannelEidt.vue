<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="500"
  >
    <el-form
      label_witdth="100px"
      style="padding-right: 30px"
      :model="formModel"
      :rules="rules"
      ref="formRef"
    >
      >
      <el-form-item label="分类名称" props="cate_name">
        <el-input
          v-model="formModel.cate_name"
          placeholder="请输入分类名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类别名" props="cate_alias">
        <el-input
          v-model="formModel.cate_alias"
          placeholder="请输入分类别名"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onSubmit"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { artAddChannelService, artEditChannelService } from '@/api/article'

const dialogVisible = ref(false)

const open = row => {
  dialogVisible.value = true
  formModel.value = { ...row }
}

defineExpose({ open })

const formModel = ref({
  id: '',
  cate_name: '',
  cate_alias: '',
})

const rules = {
  cate_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
  cate_alias: [{ required: true, message: '请输入分类别名', trigger: 'blur' }],
}

const formRef = ref()
const emit = defineEmits(['success'])
const onSubmit = async () => {
  await formRef.value.validate()
  const isEited = formModel.value.id
  if (isEited) {
    await artEditChannelService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await artAddChannelService(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success')
}
</script>

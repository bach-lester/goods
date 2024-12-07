<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑商品' : '添加商品'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表商品表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="商品名称" prop="title">
        <el-input
          v-model="formModel.title"
          placeholder="请输入商品名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品分类" prop="cate_id">
        <channel-select
          v-model="formModel.cate_id"
          width="100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="商品图片" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品详情" prop="content">
        <div class="editor">
          <quill-editor
            ref="editRef"
            content-type="html"
            v-model="formModel.content"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')" type="primary"
          >有库存</el-button
        >
        <el-button @click="onPublish('草稿')" type="info">已售罄</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { artPublishArticleService } from '@/api/article'
import { ElMessage } from 'element-plus'
import { artGetDetailsService } from '@/api/article'
import { baseURL } from '@/utils/request'
import axios from 'axios'
import { artEditArticleService } from '@/api/article'

const imageUrl = ref('')
const visibleDrawer = ref(false)
const editRef = ref()
const formModel = ref({
  title: '',
  content: '',
  cate_id: '',
  cover_img: '',
  state: '',
})
const open = async row => {
  visibleDrawer.value = true
  const isEited = row.id
  if (isEited) {
    const res = await artGetDetailsService(row.id)
    formModel.value = res.data.data
    imageUrl.value = baseURL + formModel.value.cover_img
    const file = await imageUrlToFile(imageUrl.value, formModel.value.cover_img)
    formModel.value.cover_img = file
  } else {
    formModel.value = {}
    imageUrl.value = ''
    editRef.value.setHTML('')
  }
}

defineExpose({
  open,
})

const emit = defineEmits(['success'])

const onSelectFile = file => {
  imageUrl.value = URL.createObjectURL(file.raw)
}

const onPublish = async state => {
  formModel.value.state = state
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }

  if (formModel.value.id) {
    //编辑
    await artEditArticleService(fd)
    ElMessage.success('修改成功')
    visibleDrawer.value = false
    emit('success', 'edit')
  } else {
    //添加
    await artPublishArticleService(fd)
    ElMessage.success('添加成功')
    visibleDrawer.value = false
    emit('success', 'add')
  }
}

async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], {
      type: response.headers['content-type'],
    })

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>

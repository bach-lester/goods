<script setup>
import { ref } from 'vue'
import { artGetChannelService, artDelChannelService } from '@/api/article.js'
import { Edit } from '@element-plus/icons-vue'
import { Delete } from '@element-plus/icons-vue'
import ChannelEidt from './components/ChannelEidt.vue'

const channelList = ref([])
const loading = ref(false)
const dialog = ref()
const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelService()
  channelList.value = res.data.data
  loading.value = false
  console.log(res.value)
}
getChannelList()
const onEditChannel = row => {
  dialog.value.open(row)
}
const onDelChannel = async row => {
  await ElMessageBox.confirm('此操作将永久删除该分类, 是否继续?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  const res = await artDelChannelService(row.id)
  ElMessage.success('删除成功')
  getChannelList()
}

const onAddChannel = () => {
  dialog.value.open({})
}
const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <page-container title="商品分类">
    <template #extra>
      <el-button @click="onAddChannel">添加分类</el-button>
    </template>
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            @click="onEditChannel(row)"
            type="primary"
            circle
            plain
            :icon="Edit"
          >
          </el-button>
          <el-button
            @click="onDelChannel(row)"
            type="danger"
            circle
            plain
            :icon="Delete"
          >
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据"></el-empty>
      </template>
    </el-table>
    <ChannelEidt ref="dialog" @success="onSuccess"></ChannelEidt>
  </page-container>
</template>

<style lang="scss" scoped></style>

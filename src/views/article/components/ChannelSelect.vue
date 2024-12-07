<template>
  <el-select v-model="modelValue" :style="{ width }">
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
  </el-select>
</template>

<script setup>
import { artGetChannelService } from '@/api/article'
import { ref } from 'vue'
const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelService()
  channelList.value = res.data.data
}
getChannelList()
const modelValue = defineModel()
defineProps({
  width: {
    type: String,
  },
})
</script>

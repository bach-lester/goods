<script setup>
import { ref } from 'vue'
import { Search, Refresh, Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artGetListService } from '@/api/article'
import { formatTime } from '@/utils/format.js'
import ArticleEidt from './components/ArticleEidt.vue'
import { artDelManageService } from '@/api/article'
const articleList = ref([])
const total = ref(0)
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: '',
})

const getArticleList = async () => {
  const res = await artGetListService(params.value)
  console.log(res)
  articleList.value = res.data.data
  total.value = res.data.total
}
getArticleList()

const onSizeChange = val => {
  params.value.pagenum = 1
  params.value.pagesize = val
  getArticleList()
}

const onCurrentChange = val => {
  params.value.pagenum = val
  getArticleList()
}

const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}

const onReset = () => {
  params.value = {
    pagenum: 1,
    cate_id: '',
    state: '',
  }
  getArticleList()
}

const articleEidtRef = ref(null)
const onAddArticle = () => {
  articleEidtRef.value.open({})
}
const onEditArticle = async row => {
  articleEidtRef.value.open(row)
}
const onDelArticle = async row => {
  await ElMessageBox.confirm('此操作将永久删除该文章, 是否继续?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  const res = await artDelManageService(row.id)
  ElMessage.success('删除成功')
  getArticleList()
}

const onSuccess = type => {
  if (type === 'add') {
    params.value.pagenum = Math.ceil((total.value + 1) / params.value.pagesize)
    getArticleList()
  } else {
    getArticleList()
  }
}
</script>
<template>
  <page-container title="商品管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加商品</el-button>
    </template>
    <el-form inline style="width: 100%">
      <el-form-item label="商品分类">
        <channel-select v-model="params.cate_id" width="200px"></channel-select>
      </el-form-item>

      <el-form-item label="商品库存情况">
        <el-select style="width: 200px" v-model="params.state">
          <el-option label="有库存" value="已发布"></el-option>
          <el-option label="已售罄" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary" :icon="Search"
          >搜索</el-button
        >
        <el-button @click="onReset" type="primary" :icon="Refresh"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-table :data="articleList">
      <el-table-column label="商品名称" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="更改时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            @click="onEditArticle(row)"
            type="primary"
            plain
            circle
            :icon="Edit"
          >
          </el-button>
          <el-button
            @click="onDelArticle(row)"
            type="danger"
            plain
            circle
            :icon="Delete"
          >
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据"></el-empty>
      </template>
    </el-table>

    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 7]"
      :background="true"
      layout=" jumper,total, sizes, prev, pager, next,"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
    <article-eidt @success="onSuccess" ref="articleEidtRef"></article-eidt>
  </page-container>
</template>

<style lang="scss" scoped></style>

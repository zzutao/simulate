<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ title }}</span>
    </div>
    <!-- 文字解释 -->
    <div class="description-content" v-html="description" />

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%; margin-top: 20px;">
      <el-table-column prop="chineseName" label="中文名称" width="280" />
      <el-table-column prop="englishName" label="英文名称" width="280" />
      <el-table-column prop="size" label="数据集大小" />
      <el-table-column label="下载">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDownload(scope.row.url)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      required: true,
      default: () => []
    },
    description: {
      type: String,
      required: true,
      default: ''
    },
    title: {
      type: String,
      required: true,
      default: '数据集表格'
    }
  },
  methods: {
    handleDownload(url) {
      window.open(url, '_blank')
    }
  }
}
</script>
<style scoped>
.description-content {
  white-space: pre-line; /* 保留换行符但合并空白 */
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.description-content a {
  color: #409EFF;
  text-decoration: none;
}
</style>

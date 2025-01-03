<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>数据集信息</span>
    </div>
    <!-- 文字解释 -->
    <p>{{ description }}</p>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%; margin-top: 20px;">
      <el-table-column prop="chineseName" label="中文名称" width="180" />
      <el-table-column prop="englishName" label="英文名称" width="180" />
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
  props: ['tableData', 'description'],
  methods: {
    handleDownload(url) {
      window.open(url, '_blank')
    }
  }
}
</script>

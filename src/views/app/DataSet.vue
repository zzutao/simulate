<template>
  <div>
    <!-- 标签页 -->
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane label="MD17数据集" name="md17">
        <dataset-table
          :table-data="md17Data"
          :description="md17Description"
        />
      </el-tab-pane>
      <el-tab-pane label="MD22数据集" name="md22">
        <dataset-table
          :table-data="md22Data"
          :description="md22Description"
        />
      </el-tab-pane>
      <el-tab-pane label="ISO17数据集" name="iso17">
        <dataset-download
          title="ISO17数据集"
          description="这是ISO17数据集的介绍。"
          download-url="http://quantum-machine.org/datasets/iso17.tar.gz"
          download-type="direct"
        />
      </el-tab-pane>
      <el-tab-pane label="MPF数据集" name="mpf">
        <dataset-download
          title="MPF数据集"
          description="这是MPF数据集的介绍。"
          download-url="https://figshare.com/articles/dataset/MPF_2021_2_8/19470599"
          download-type="link"
        />
      </el-tab-pane>
      <el-tab-pane label="MPtrj数据集" name="mpt">
        <dataset-download
          title="MPtrj数据集"
          description="这是MPtrj数据集的介绍。"
          download-url="https://figshare.com/articles/dataset/Materials_Project_Trjectory_MPtrj_Dataset/23713842"
          download-type="link"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DatasetTable from './DatasetTable.vue'
import DatasetDownload from './DatasetDownload.vue'

export default {
  components: {
    DatasetTable,
    DatasetDownload
  },
  data() {
    return {
      activeTab: 'md17',
      md17Data: [
        { chineseName: '苯', englishName: 'Benzene', size: '627983', url: 'http://www.sgdml.org/#datasets' }
        // 添加更多行...
      ],
      md22Data: [
        { chineseName: '苯', englishName: 'Benzene', size: '627983', url: 'http://www.sgdml.org/#datasets' }
        // 添加更多行...
      ],
      md17Description: '这是MD17数据集的介绍。MD17 是一个广泛使用的分子动力学数据集，适用于机器学习模型训练。',
      md22Description: '这是MD22数据集的介绍。MD22 是一个扩展的分子动力学数据集，增加了新的化合物和特性，适用于更复杂的机器学习任务。'
    }
  }
}
</script>

  <style scoped>
  /* 可选样式 */
  .el-tabs {
    margin-top: 20px;
  }

  .el-card {
    margin-top: 20px;
  }
  </style>

<template>
  <div>
    <!-- 大卡片 -->
    <el-card class="box-card" shadow="always">
      <div slot="header" class="clearfix">
        <span>日志分析</span>
      </div>

      <!-- 按钮区域 -->
      <el-row :gutter="20" style="margin-bottom: 20px;">
        <!-- 上传文件区域 -->
        <el-col :span="12">
          <el-upload
            ref="upload"
            :action="uploadUrl"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :auto-upload="false"
            :limit="1"
            :file-list="fileList"
            accept=".log, .lammps"
            class="upload-demo"
          >
            <el-button slot="trigger" type="primary">上传日志文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传一个日志文件，文件格式为 .log</div>
          </el-upload>
        </el-col>
        <!-- 分析按钮 -->
        <el-col :span="12" style="text-align: right;">
          <el-button type="success" @click="submitAnalysis">点击分析</el-button>
        </el-col>
      </el-row>

      <!-- 折线图小卡片 -->
      <el-card v-if="lineChartData" class="chart-card">
        <div slot="header" class="clearfix">
          <span>折线图</span>
        </div>
        <div id="lineChart" style="width: 100%; height: 400px;" />
      </el-card>

      <!-- 饼状图小卡片 -->
      <el-card v-if="pieChartData" class="chart-card">
        <div slot="header" class="clearfix">
          <span>饼状图</span>
        </div>
        <div id="pieChart" style="width: 100%; height: 400px;" />
      </el-card>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'

export default {
  data() {
    return {
      uploadUrl: '', // 后端上传接口地址
      fileList: [], // 文件列表
      lineChartData: null, // 折线图数据
      pieChartData: null, // 饼状图数据
      lineChartInstance: null, // 折线图实例
      pieChartInstance: null // 饼状图实例
    }
  },
  mounted() {
    this.uploadUrl = 'http://127.0.0.1:5000/api/upload_log' // 设置后端上传接口地址
  },
  beforeDestroy() {
    // 在组件销毁前清理ECharts实例
    if (this.lineChartInstance) {
      this.lineChartInstance.dispose()
    }
    if (this.pieChartInstance) {
      this.pieChartInstance.dispose()
    }
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1) // 只保留最新的文件
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    async submitAnalysis() {
      if (this.fileList.length === 0) {
        this.$message.error('请先选择一个日志文件')
        return
      }

      const formData = new FormData()
      formData.append('file', this.fileList[0].raw)

      try {
        const response = await axios.post(this.uploadUrl, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })

        this.lineChartData = response.data.data.line_chart
        this.pieChartData = response.data.data.pie_chart

        this.$nextTick(() => {
          this.drawCharts()
        })
      } catch (error) {
        console.error('There was an error!', error)
        this.$message.error('分析失败，请检查文件或稍后再试')
      }
    },
    drawCharts() {
      // 确保在调用此函数之前，lineChartData和pieChartData不为null
      if (!this.lineChartData || !this.pieChartData) return

      // 初始化或更新折线图
      if (this.lineChartData && document.getElementById('lineChart')) {
        if (this.lineChartInstance) {
          this.lineChartInstance.dispose() // 清理旧的实例
        }
        this.lineChartInstance = echarts.init(document.getElementById('lineChart'))
        this.lineChartInstance.setOption({
          title: { text: '模拟数据折线图' },
          tooltip: { trigger: 'axis' },
          legend: { data: Object.keys(this.lineChartData.yData) },
          xAxis: { type: 'category', data: this.lineChartData.xData },
          yAxis: { type: 'value' },
          series: Object.keys(this.lineChartData.yData).map(key => ({
            name: key,
            type: 'line',
            data: this.lineChartData.yData[key]
          }))
        })
      }

      // 初始化或更新饼状图
      if (this.pieChartData && document.getElementById('pieChart')) {
        if (this.pieChartInstance) {
          this.pieChartInstance.dispose() // 清理旧的实例
        }
        this.pieChartInstance = echarts.init(document.getElementById('pieChart'))
        this.pieChartInstance.setOption({
          title: { text: '任务时间分布饼状图' },
          tooltip: { trigger: 'item' },
          series: [
            {
              name: '分布',
              type: 'pie',
              data: this.pieChartData.seriesData
            }
          ]
        })
      }
    }
  }
}
</script>

  <style scoped>
  .box-card {
    width: 100%;
  }

  .chart-card {
    margin-top: 20px;
  }

  .upload-demo {
    margin-bottom: 20px;
  }
  </style>

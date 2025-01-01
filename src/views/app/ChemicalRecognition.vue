<template>
  <div>
    <!-- 大卡片 -->
    <el-card class="box-card" shadow="always">
      <div slot="header" class="clearfix">
        <span>认识物质</span>
      </div>
      <!-- 使用 el-row 和 el-col 来确保输入框和按钮在同一行 -->
      <el-row :gutter="20">
        <el-col :span="18">
          <el-form :model="form" label-width="100px">
            <el-form-item label="化学名称">
              <el-input v-model="form.chemicalName" placeholder="请输入英文化学名称" />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="submitForm">查询</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 小卡片区域 -->
    <div v-if="responseData" class="small-cards">
      <!-- 左侧小卡片 - 显示description -->
      <el-card v-if="responseData.description && responseData.description.trim()" class="small-card description-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>物质信息</span>
        </div>
        <pre>{{ responseData.description }}</pre>
      </el-card>

      <!-- 右侧小卡片 - 显示图片 -->
      <el-card v-if="responseData.image_url && responseData.image_url.trim()" class="small-card image-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>平面图</span>
        </div>
        <img :src="responseData.image_url" alt="平面图">
      </el-card>
    </div>
  </div>
</template>

<script>
import { queryChemicalData } from '@/api/chemical' // 确保这里正确导入了 queryChemicalData 函数

export default {
  data() {
    return {
      form: {
        chemicalName: ''
      },
      responseData: null,
      errorMessage: ''
    }
  },
  methods: {
    async submitForm() {
      if (!this.form.chemicalName) {
        this.$message.error('请输入化学名称')
        return
      }

      try {
        const response = await queryChemicalData({ chemical_name: this.form.chemicalName })
        console.log('Full Response:', response) // 打印完整的响应对象

        if (response.status === 200 && response.code === 20000) {
          this.responseData = response
          this.errorMessage = '' // 清除任何之前错误消息
          this.$message({
            message: '数据提交成功',
            type: 'success', // 使用成功类型的消息
            duration: 5 * 1000
          })
        } else {
          this.errorMessage = response.message || '请求失败，请检查输入或稍后再试。'
          this.$message({
            message: this.errorMessage,
            type: 'error', // 使用错误类型的消息
            duration: 5 * 1000
          })
        }
      } catch (error) {
        console.error('There was an error!', error)
        let errorMessage

        // 检查是否为超时错误
        if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
          errorMessage = '请求超时，请检查网络连接或稍后再试'
        } else if (error.response) {
          // 请求已发出，但服务器返回了状态码不在 2xx 范围内的响应
          errorMessage = error.response?.message || '服务器返回了一个无效的响应'
        } else if (error.request) {
          // 请求已发出，但没有收到响应
          errorMessage = '未收到服务器响应，请检查网络连接'
        } else {
          // 在设置请求时发生了一些事情，触发了异常
          errorMessage = '请求配置错误，请检查代码'
        }

        this.errorMessage = errorMessage
        this.$message({
          message: errorMessage,
          type: 'error',
          duration: 5 * 1000
        })
      }
    }
  }
}
</script>

<style scoped>
.box-card {
  width: 100%;
  margin-bottom: 20px;
}

.small-cards {
  display: flex;
  justify-content: space-between;
}

/* 减小卡片的宽度 */
.small-card {
  width: 45%; /* 调整宽度 */
  min-height: 200px; /* 减小最小高度 */
  flex-grow: 1; /* 允许卡片根据内容扩展 */
  margin: 5px; /* 添加一些外边距以避免卡片贴得太近 */
}

.small-card img {
  width: 80%;
  height: 80%;
}

.el-row {
  margin-bottom: 20px;
}
</style>

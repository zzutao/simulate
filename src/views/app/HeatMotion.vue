<template>
  <div>
    <!-- 大卡片 -->
    <el-card class="box-card" shadow="always">
      <div slot="header" class="clearfix">
        <span>二维平面热运动</span>
      </div>
      <el-form :model="form" label-width="150px">
        <!-- 使用 el-row 和 el-col 创建一个水平布局 -->
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="选择原子类型">
              <el-select v-model="form.atomType" placeholder="请选择">
                <el-option
                  v-for="item in atomOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="模拟原子数量">
              <el-input-number v-model="form.atomCount" :min="1" :max="10000" :step="100" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" @click="startSimulation">点击运动</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 显示GIF图 -->
      <div v-if="gifUrl" class="gif-container">
        <img :src="gifUrl" alt="热运动模拟">
      </div>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </el-card>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      form: {
        atomType: 'Ar', // 默认值
        atomCount: 1000 // 默认值
      },
      atomOptions: [
        { value: 'H', label: '氢 (H)' },
        { value: 'He', label: '氦 (He)' },
        { value: 'Ne', label: '氖 (Ne)' },
        { value: 'Ar', label: '氩 (Ar)' },
        { value: 'Kr', label: '氪 (Kr)' },
        { value: 'Xe', label: '氙 (Xe)' },
        { value: 'N', label: '氮 (N)' },
        { value: 'O', label: '氧 (O)' },
        { value: 'F', label: '氟 (F)' },
        { value: 'C', label: '碳 (C)' },
        { value: 'Si', label: '硅 (Si)' }
      ],
      gifUrl: '', // 存储从服务器接收的GIF URL
      errorMessage: '' // 存储可能的错误消息
    }
  },
  methods: {
    async startSimulation() {
      this.gifUrl = '' // 清除之前的GIF URL
      this.errorMessage = '' // 清除之前的错误消息

      try {
        const response = await request({
          url: 'http://127.0.0.1:5000/api/HeatMotion',
          method: 'post',
          data: this.form,
          timeout: 40000
        })

        if (response.code === 20000) {
          // 成功接收数据，更新GIF URL
          this.gifUrl = response.image_url
        } else {
          // 处理非成功的响应码，设置错误消息
          this.errorMessage = response.message || '未知错误'
        }
      } catch (error) {
        // 捕获任何发生的错误，并设置错误消息
        this.errorMessage = `请求失败: ${error.message}`
        console.error('There was an error!', error) // 打印错误信息到控制台
      }
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}

.gif-container img {
  max-width: 100%;
  height: auto;
}
.error-message {
  color: red;
}
</style>

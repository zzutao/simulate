<!-- <template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script> -->
<template>
  <div class="main-page">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card welcome-card" shadow="always">
          <div slot="header" class="clearfix card-header">
            <span>欢迎页面</span>
          </div>
          <div class="welcome-message-container">
            <div class="welcome-message" v-html="displayedMessage" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card feature-card" shadow="always">
          <div slot="header" class="clearfix card-header">
            <span>系统功能</span>
          </div>
          <el-carousel :interval="5000" arrow="always" height="300px">
            <el-carousel-item v-for="(item, index) in carouselItems" :key="index" class="carousel-item">
              <div class="carousel-content">
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '欢迎来到分子动力学模拟辅助工具系统！',
      displayedMessage: '',
      intervalId: null,
      carouselItems: [
        { title: '认识物质', description: '了解不同物质的基本属性和特性' },
        { title: '二维平面热运动', description: '观察粒子在二维平面上的热运动模式' },
        { title: '日志分析', description: '解析模拟过程中生成的日志文件' },
        { title: '轨迹分析', description: '深入分析模拟过程中的轨迹数据' },
        { title: '生成模拟视频', description: '根据模拟数据生成可视化视频' },
        { title: '归纳数据集', description: '整理和总结常见的数据集' }
      ]
    }
  },
  mounted() {
    this.startTypingEffect()
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  methods: {
    startTypingEffect() {
      let i = 0
      this.intervalId = setInterval(() => {
        if (i < this.message.length) {
          this.displayedMessage += this.message.charAt(i)
          i++
        } else {
          clearInterval(this.intervalId)
        }
      }, 100) // 调整间隔时间以改变打字速度
    }
  }
}
</script>

<style scoped>
.main-page {
  padding: 20px;
}

.box-card {
  height: 400px;
}

.card-header {
  text-align: center;
}

.welcome-card .welcome-message-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.welcome-message {
  font-size: 1.5em;
  line-height: 1.5;
  text-align: center;
}

.feature-card .el-carousel__container {
  height: 100% !important;
}

.carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f0f2f5; /* 统一背景色 */
}

.carousel-content {
  text-align: center;
}

.carousel-content h3 {
  color: #303133;
  margin-bottom: 10px;
}

.carousel-content p {
  color: #606266;
  font-size: 14px;
  line-height: 24px;
}
</style>

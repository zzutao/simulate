<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ title }}</span>
    </div>
    <!-- 文字解释 -->
    <div class="description-content" v-html="description" />
    <el-button
      :type="downloadType === 'direct' ? 'primary' : 'default'"
      style="float: right; margin-top: 10px;"
      @click="handleDownload"
    >
      下载
    </el-button>
  </el-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: '下载数据集'
    },
    description: {
      type: String,
      required: true,
      default: ''
    },
    downloadUrl: {
      type: String,
      required: true
    },
    downloadType: {
      type: String,
      required: true,
      validator(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['direct', 'newTab', 'link'].indexOf(value) !== -1
      }
    }
  },
  methods: {
    handleDownload() {
      if (this.downloadType === 'direct') {
        window.location.href = this.downloadUrl
      } else {
        window.open(this.downloadUrl, '_blank')
      }
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

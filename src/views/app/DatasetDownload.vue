<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ title }}</span>
    </div>
    <p>{{ description }}</p>
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
  props: ['title', 'description', 'downloadUrl', 'downloadType'],
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

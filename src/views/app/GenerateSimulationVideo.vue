<template>
  <el-card class="box-card" shadow="always">
    <div slot="header" class="clearfix">
      <span>生成模拟视频</span>
    </div>
    <el-upload
      class="upload-section"
      :action="''"
      :auto-upload="false"
      :on-change="handleTopologyFileChange"
      :on-remove="handleRemove"
      :file-list="topologyFileList"
      :limit="1"
      :multiple="false"
    >
      <el-button type="primary">上传拓扑文件</el-button>
      <span style="margin-left: 10px;">只能上传一个拓扑文件</span>
    </el-upload>

    <el-upload
      class="upload-section"
      :action="''"
      :auto-upload="false"
      :on-change="handleTrajectoryFileChange"
      :on-remove="handleRemove"
      :file-list="trajectoryFileList"
      accept=".traj,.lammpstraj"
      :limit="1"
      :multiple="false"
    >
      <el-button type="primary">上传轨迹文件</el-button>
      <span style="margin-left: 10px;">只能上传一个轨迹文件（.traj 或 .lammpstraj）</span>
    </el-upload>

    <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="您的邮箱" prop="email">
        <el-input v-model="formData.email" />
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm('formRef')">提交</el-button>
      </el-form-item>
    </el-form>

    <p>
      根据您上传的拓扑文件和轨迹文件，为您生成分子动力学模拟视频，将分子动力学模拟视频打包发至您填写的邮箱中！
    </p>
  </el-card>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      topologyFile: null,
      trajectoryFile: null,
      topologyFileList: [],
      trajectoryFileList: [],
      formData: {
        email: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    handleTopologyFileChange(file) {
      this.topologyFile = file.raw
      this.topologyFileList = [file]
    },
    handleTrajectoryFileChange(file) {
      this.trajectoryFile = file.raw
      this.trajectoryFileList = [file]
    },
    handleRemove(file, fileList) {
      if (file === this.topologyFile) this.topologyFile = null
      else if (file === this.trajectoryFile) this.trajectoryFile = null
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.topologyFile && this.trajectoryFile) {
          const formData = new FormData()
          formData.append('topology', this.topologyFile)
          formData.append('trajectory', this.trajectoryFile)
          formData.append('email', this.formData.email)

          axios.post('http://127.0.0.1:5000/api/get_video', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(response => {
            console.log('Backend response:', response.data)
            this.$message({
              message: '生成模拟视频的请求发送成功',
              type: 'success',
              duration: 5 * 1000
            })
          }).catch(error => {
            console.error('Error:', error)
            this.$message({
              message: '数据提交失败，请重试。',
              type: 'error',
              duration: 5 * 1000
            })
          })
        } else {
          this.$message.error('请检查并填写所有信息')
        }
      })
    }
  }
}
</script>

<style scoped>
.upload-section {
  margin-bottom: 20px;
}
</style>

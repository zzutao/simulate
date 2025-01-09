<template>
  <el-card class="box-card" shadow="always">
    <div slot="header" class="clearfix">
      <span>轨迹分析</span>
    </div>
    <div>
      <!-- 文件上传 -->
      <el-upload
        ref="upload"
        class="upload-demo"
        :action="''"
        :auto-upload="false"
        :on-change="handleChange"
        :file-list="fileList"
        :limit="1"
        accept=".traj,.lammpstraj"
        :on-exceed="handleExceed"
        :on-remove="handleRemove"
      >
        <el-button size="small" type="primary">上传轨迹文件</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传一个轨迹文件，文件格式为 traj 或 lammpstraj
        </div>
      </el-upload>

      <!-- 表单 -->
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        class="mt-4"
      >
        <el-form-item label="您的邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>

      <!-- 描述文字 -->
      <p class="mt-4">
        根据您上传的轨迹文件和模拟时间步长，为您计算径向分布函数（RDF），计算均方位移（MSD）和计算速度自相关函数（VACF），将计算结果打包发至您填写的邮箱中！
      </p>
    </div>
  </el-card>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      fileList: [],
      form: {
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
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1) // 确保只保留一个文件
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件。本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.fileList.length > 0) {
          const formData = new FormData()
          formData.append('file', this.fileList[0].raw)
          formData.append('email', this.form.email)

          axios.post('http://127.0.0.1:5000/api/upload_traj', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then(response => {
              console.log('Response from server:', response.data)
              this.$message({
                message: '计算请求发送成功',
                type: 'success',
                duration: 5 * 1000
              })
            })
            .catch(error => {
              console.error('There was an error!', error)
              this.$message({
                message: '数据提交失败，请重试。',
                type: 'error',
                duration: 5 * 1000
              })
            })
        } else {
          this.$message.error('请确保所有字段都已正确填写并且上传了文件')
        }
      })
    }
  }
}
</script>

<style scoped>
.box-card {
  width: 100%;
}

.mt-4 {
  margin-top: 20px;
}
</style>

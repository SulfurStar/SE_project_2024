<template>
  <div class="header">
    <h1>新增貼文</h1>
  </div>
  <div class="new-post-container">
    <div class="the-form">
      <el-form ref="postForm" :model="post" :rules="rules" label-width="100px">
        <el-form-item label="標題" prop="title">
          <el-input v-model="post.title" placeholder="輸入貼文標題"></el-input>
        </el-form-item>
        <el-form-item label="內容" prop="content">
          <el-input type="textarea" v-model="post.content" placeholder="輸入貼文內容"></el-input>
        </el-form-item>
        <el-form-item label="圖片" prop="image">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :file-list="fileList"
            :limit="1"
            :auto-upload="false">
            <el-button size="small" type="primary">選擇圖片</el-button>
            <template v-slot:tip>
              <div class="el-upload__tip">只能上傳 jpg/png 文件
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const post = ref({
      title: '',
      content: '',
      image: ''
    })

    const rules = {
      title: [
        { required: true, message: '請輸入標題', trigger: 'blur' },
        { min: 3, message: '標題不能少於 3 個字', trigger: 'blur' }
      ],
      content: [
        { required: true, message: '請輸入內容', trigger: 'blur' },
        { min: 10, message: '內容不能少於 10 個字', trigger: 'blur' }
      ],
      image: [
        { required: true, message: '請上傳圖片', trigger: 'change' }
      ]
    }

    const fileList = ref([])

    const handleSuccess = (response, file, fileList) => {
      post.value.image = response.url
    }

    const handleRemove = (file, fileList) => {
      post.value.image = ''
    }

    const submitForm = () => {
      this.$refs.postForm.validate((valid) => {
        if (valid) {
          // 發送請求以提交表單數據
          console.log('表單數據: ', post.value)
        } else {
          console.log('表單驗證失敗!')
          return false
        }
      })
    }

    const resetForm = () => {
      this.$refs.postForm.resetFields()
    }

    return {
      post,
      rules,
      fileList,
      handleSuccess,
      handleRemove,
      submitForm,
      resetForm
    }
  }
}
</script>

<style scoped>
.new-post-container {
  display: flex;
  width: 100%;
  padding: 20px;
  justify-content: center;
  align-items: center;
}

.the-form {
  width: 100%;
  max-width: 600px;
}

.upload-demo {
  width: 200px;
  margin: 0 auto;
}

.header h1 {
  text-align: center;
  margin: 0;
  padding: 20px 0;
}

.header{
  width: 100%;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eaeaea;
}

.main {
  max-width: 600px;
  margin: 0 auto;
}
</style>
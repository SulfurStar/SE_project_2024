<template>
  <div class="upload-container">
    <h1>上傳 CSV 來創建帳號</h1>
    <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      action="/api/create_account"
      :on-success="handleSuccess"
      :on-error="handleError"
      :limit="1"
      accept=".csv"
    >
      <div class="button-container">
        <el-button type="primary">點擊上傳</el-button>
      </div>
      <template #tip>
        <div class="el-upload__tip">僅允許 CSV 文件</div>
      </template>
    </el-upload>
    <el-progress
      v-if="isLoading"
      :percentage="percentage"
      :indeterminate="true"
      class="progress-bar"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-progress.css";

// 定義頁面元數據，包括中間件
definePageMeta({
  middleware: "auth",
});

// 文件列表
const fileList = ref([]);
// 加載狀態
const isLoading = ref(false);
// 進度百分比
const percentage = ref(0);

// 上傳成功處理函數
const handleSuccess = (response: any, file: any, fileList: any) => {
  if (response.length === 0) {
    // 如果沒有創建任何帳號，顯示警告消息
    ElMessage({
      message: "未創建任何帳號",
      type: "warning",
    });
  } else {
    // 成功創建帳號的消息
    ElMessage({
      message: `成功創建了 ${response.length} 個帳號`,
      type: "success",
    });
  }
  // 重置加載狀態
  isLoading.value = false;
};

// 上傳失敗處理函數
const handleError = (err: any, file: any, fileList: any) => {
  // 顯示上傳失敗的消息
  ElMessage({
    message: "上傳失敗",
    type: "error",
  });
  // 重置加載狀態
  isLoading.value = false;
};
</script>
<style scoped>
.upload-container {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直置中 */
  align-items: center; /* 水平置中 */
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9; /* 背景顏色 */
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333; /* 字體顏色 */
}

.el-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
}

.el-upload__tip {
  margin-top: 1rem;
  color: #999;
  text-align: center;
}

.progress-bar {
  width: 100%;
  margin-top: 1rem;
}

.progress-container {
  margin-top: 1rem;
}
</style>

<template>
    <div class="visitation-check-container">
      <h1>訪視紀錄</h1>
      <div v-if="loading">正在加載訪視紀錄...</div>
      <div v-else>
        <ul>
          <li v-for="record in records" :key="record.id">
            <strong>學生 ID:</strong> {{ record.studentId }} <br />
            <strong>導師 ID:</strong> {{ record.teacherId }} <br />
            <strong>導師意見:</strong> {{ record.info_teacher }} <br />
            <strong>學生反饋:</strong> {{ record.info_student }} <br />
            <strong>創建時間:</strong> {{ record.date_create }} <br />
            <strong>更新時間:</strong> {{ record.date_update }} <br />
            <el-button type="danger" @click="deleteRecord(record.id)">刪除</el-button>
          </li>
        </ul>
        <el-button type="primary" @click="goBack">返回</el-button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import 'element-plus/theme-chalk/el-message.css';
  
  const records = ref([]);
  const loading = ref(true);
  const router = useRouter();
  const route = useRoute();
  
  const fetchRecords = async () => {
    try {
      const response = await fetch(`/api/visitation/getVisitationRecords?teacherId=${route.params.id}`);
      const data = await response.json();
      records.value = data;
    } catch (error) {
      console.error('Error fetching visitation records:', error);
    } finally {
      loading.value = false;
    }
  };
  
  const deleteRecord = async (recordId) => {
    try {
      const response = await fetch(`/api/visitation/deleteVisitationRecord/${recordId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete record');
      }
  
      records.value = records.value.filter(record => record.id !== recordId);
  
      ElMessage({
        message: '刪除成功',
        type: 'success',
      });
    } catch (error) {
      console.error('Error deleting record:', error);
      ElMessage({
        message: '刪除失敗',
        type: 'error',
      });
    }
  };
  
  const goBack = () => {
    router.push('/visitation/VisitCheckAdmin');
  };
  
  onMounted(fetchRecords);
  </script>
  
  <style scoped>
  .visitation-check-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    padding: 0.5rem;
    margin: 0.5rem 0;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .el-button {
    margin-left: 1rem;
  }
  </style>
  
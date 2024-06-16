<template>
    <div class="check-teacher-container">
      <h1>教師訪視紀錄檢查</h1>
      <div v-if="loading">正在加載教師數據...</div>
      <div v-else>
        <ul>
          <li v-for="teacher in teachers" :key="teacher.id">
            <strong>{{ teacher.name }}</strong> - {{ teacher.email }}
            <el-button type="primary" @click="viewVisitationRecords(teacher.id)">查看訪視紀錄</el-button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const teachers = ref([]);
  const loading = ref(true);
  const router = useRouter();
  
  const fetchTeachers = async () => {
    try {
      const response = await fetch('/api/getTeachers');
      const data = await response.json();
      teachers.value = data;
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      loading.value = false;
    }
  };
  
  const viewVisitationRecords = (teacherId) => {
    router.push(`/VisitationCheck/${teacherId}`);
  };
  
  onMounted(fetchTeachers);
  </script>
  
  <style scoped>
  .check-teacher-container {
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
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  
<template>
  <div class="page-container">
    <h1 class="page-title">沒有訪視記錄的學生</h1>
    <div v-if="loading">加載中...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="student in students" :key="student.id">
          <router-link :to="{ name: 'CreateRecord', params: { id: student.id }}">{{ student.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const students = ref([]);
const loading = ref(true);
const error = ref<string | null>(null);

const fetchStudents = async () => {
  try {
    const response = await fetch('/api/visitation/getStudentsWithoutVisitRecords');
    const result = await response.json();
    if (result.success) {
      students.value = result.data;
    } else {
      error.value = result.message;
    }
  } catch (err) {
    error.value = '請求失敗';
  } finally {
    loading.value = false;
  }
};

onMounted(fetchStudents);
</script>

<style scoped>
.page-container {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 40px auto;
}

.page-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

a {
  color: blue;
  text-decoration: underline;
}
</style>

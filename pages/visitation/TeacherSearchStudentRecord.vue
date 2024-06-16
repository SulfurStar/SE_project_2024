<template>
  <div class="page-container">
    <h1 class="page-title">訪視紀錄</h1>
    <div v-if="loading">加載中...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <p>當前使用者ID: {{ userId }}</p>
      <table>
        <thead>
          <tr>
            <th>學生姓名</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in visitRecords" :key="record.id">
            <td>{{ record.student.name }}</td>
            <td>
              <nuxt-link :to="`/visit_record/${record.id}`">
                <button class="styled-button">{{ record.student.name }}</button>
              </nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const user = useState("user")
const userId = user.value?.id || ''
const visitRecords = ref([])
const loading = ref(true)
const error = ref<string | null>(null)

const fetchVisitRecords = async () => {
  try {
    const response = await fetch('/api/visitation/get-visit-records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ teacherId: userId }),
    })
    const result = await response.json()
    if (result.success) {
      visitRecords.value = result.data
    } else {
      error.value = '無法獲取訪視記錄'
    }
  } catch (err) {
    error.value = '請求失敗'
  } finally {
    loading.value = false
  }
}

onMounted(fetchVisitRecords)
</script>

<style scoped>
.page-container {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 40px auto;
}

.page-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}

.styled-button {
  background-color: #007BFF;
  border: none;
  border-radius: 8px;
  color: white;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.styled-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}
</style>

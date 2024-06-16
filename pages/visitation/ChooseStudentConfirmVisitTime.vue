<template>
  <div class="page-container">
    <h1 class="page-title">選擇學生填寫訪視時間</h1>
    <div v-if="loading">加載學生中...</div>
    <div v-else>
      <div v-if="visits.length > 0">
        <ul class="visit-list">
          <li v-for="visit in visits" :key="visit.id">
            訪視ID: {{ visit.id }} - 學生ID: {{ visit.studentId }}
          </li>
        </ul>
      </div>
      <div v-else>
        <p>沒有學生需要填寫訪視時間。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useState } from '#app'

const visits = ref([])
const loading = ref(true)
const error = ref(null)
const router = useRouter()
const user = useState("user")

onMounted(async () => {
  try {
    if (user.value) {
      const response = await fetch('/api/get-students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teacherId: user.value.id }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch visits')
      }

      const data = await response.json()

      if (data.success) {
        console.log('Fetched visits:', data.data); // 打印获取的数据进行调试
        visits.value = data.data
      } else {
        throw new Error(data.message)
      }
    }
  } catch (err) {
    console.error('加載訪視時出錯:', err)
    error.value = '加載訪視失敗'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 40px auto;
}

.page-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.visit-list {
  list-style: none;
  padding: 0;
  width: 100%;
}

.visit-list li {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: background-color 0.3s;
}

.visit-list li:hover {
  background-color: #e9ecef;
}
</style>

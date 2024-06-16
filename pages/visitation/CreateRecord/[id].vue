<template>
  <div class="page-container">
    <h1 class="page-title">创建访视记录</h1>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <p>教师ID: {{ teacherId }}</p>
      <p>学生ID: {{ studentId }}</p>
      <button @click="createRecord">创建访视记录</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const studentId = route.params.id;
const teacherId = useState('user').value.id;

const loading = ref(true);
const error = ref<string | null>(null);

const createRecord = async () => {
  try {
    const response = await fetch('/api/visitation/createVisitRecord', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        teacherId,
        studentId,
        date_create: new Date().toISOString(),
      }),
    });

    const result = await response.json();

    if (result.success) {
      alert('创建成功');
      router.push('/visitation');
    } else {
      alert('创建失败');
      error.value = result.message;
    }
  } catch (err) {
    error.value = '请求失败';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loading.value = false;
});
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

button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>

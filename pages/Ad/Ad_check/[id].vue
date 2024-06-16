<template>
    <div class="check-ad-container">
      <h1>Check Advertise</h1>
      <div v-if="loading">Loading advertise data...</div>
      <div v-else>
        <div v-for="(value, key) in advertise" :key="key">
          <div v-if="!excludeKeys.includes(key)">
            <label :for="key">{{ key }}</label>
            <p :id="key">{{ formatValue(value) }}</p>
          </div>
        </div>
        <button @click="approveAdvertise">批准廣告</button>
        <button @click="rejectAdvertise" class="reject-button">不批准廣告</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import 'element-plus/theme-chalk/el-message.css';
  
  const advertise = ref({});
  const loading = ref(true);
  const router = useRouter();
  const route = useRoute(); // 獲取動態路由參數
  
  // 不應顯示在表單中的屬性
  const excludeKeys = ['id', 'createdAt', 'updatedAt', 'authorId'];
  
  const fetchAdvertise = async () => {
    try {
      const response = await fetch(`/api/ad/getAdvertiseData/${route.params.id}`);
      const data = await response.json();
      advertise.value = data;
    } catch (error) {
      console.error('Error fetching advertise data:', error);
    } finally {
      loading.value = false;
    }
  };
  
  const formatValue = (value) => {
    if (typeof value === 'boolean') {
      return value ? '是' : '否';
    }
    return value || 'N/A';
  };
  
  const approveAdvertise = async () => {
    try {
      const response = await fetch(`/api/ad/approveAdvertise/${route.params.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verify: 'ADOPTED' }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to approve advertise');
      }
  
      const data = await response.json();
  
      console.log('Advertise approved successfully:', data);
  
      ElMessage({
        message: '廣告已批准',
        type: 'success',
      });
  
      router.push('/Ad/Ad_verify'); // 更新完成后跳转回用户管理页面
    } catch (error) {
      console.error('Error approving advertise:', error);
      ElMessage({
        message: '批准失敗',
        type: 'error',
      });
    }
  };
  
  const rejectAdvertise = async () => {
    try {
      const response = await fetch(`/api/ad/approveAdvertise/${route.params.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verify: 'FAILED' }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to reject advertise');
      }
  
      const data = await response.json();
  
      console.log('Advertise rejected successfully:', data);
  
      ElMessage({
        message: '廣告未批准',
        type: 'success',
      });
  
      router.push('/Ad/Ad_verify'); // 更新完成后跳转回用户管理页面
    } catch (error) {
      console.error('Error rejecting advertise:', error);
      ElMessage({
        message: '不批准失敗',
        type: 'error',
      });
    }
  };
  
  onMounted(fetchAdvertise);
  </script>
  
  <style scoped>
  .check-ad-container {
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
  
  label {
    font-weight: bold;
    margin-top: 1rem;
  }
  
  p {
    padding: 0.5rem;
    margin-top: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
  }
  
  button {
    margin-top: 2rem;
    padding: 0.75rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 1rem;
  }
  
  .reject-button {
    background-color: #dc3545;
  }
  </style>
  
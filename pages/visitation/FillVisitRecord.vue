<template>
  <div class="page-container">
    <h1 class="page-title">填寫訪視紀錄</h1>
    <div class="input-container">
      <textarea v-model="record" class="record-input" placeholder="請填寫訪視紀錄..."></textarea>
    </div>
    <div class="button-group">
      <button class="confirm-button" @click="confirmRecord">确认</button>
      <button class="delete-button" @click="deleteRecord">删除</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const record = ref('')

const confirmRecord = () => {
  alert(`確認紀錄: ${record.value}`)
}

const deleteRecord = () => {
  record.value = ''
}
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

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
}

.record-input {
  width: 100%;
  height: 200px;
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ced4da;
  margin-bottom: 10px;
}

.button-group {
  display: flex;
  gap: 20px;
}

.confirm-button, .delete-button {
  background-color: #28a745;
  border: none;
  border-radius: 8px;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.confirm-button:hover {
  background-color: #218838;
}

.delete-button {
  background-color: #dc3545;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>

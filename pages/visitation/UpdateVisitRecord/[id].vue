<template>
  <div class="page-container">
    <h1 class="page-title">訪視紀錄</h1>
    <div v-if="loading">載入中...</div>
    <div v-else>
      <div v-if="error">{{ error }}</div>
      <div v-else>
        <FillVisitRecord :initialData="formData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useState } from '#app'
import FillVisitRecord from '~/components/FillVisitRecord.vue'

const formData = ref({})
const user = useState("user")
const route = useRoute()
const loading = ref(true)
const error = ref<string | null>(null)

const parseInfoString = (infoString: string) => {
  const data = {
    address: '',
    phone: '',
    accommodationType: '',
    monthlyRent: '',
    deposit: '',
    hasContract: '',
    safety: {
      woodenPartition: '',
      fireAlarmExtinguisher: '',
      emergencyExit: '',
      windowsDoorsLocks: '',
      lightingEquipment: '',
      legalSafetyCompliance: '',
      hotWaterSupply: '',
      multiElectricalAppliances: '',
      runningWaterFunctionality: '',
      gasSafety: '',
      roomCount: '',
      emergencyLighting: '',
      electronicLock: ''
    }
  }
  const lines = infoString.split('\n').map(line => line.trim())
  lines.forEach(line => {
    const [key, value] = line.split(':').map(part => part.trim())
    if (key && value) {
      const keys = key.split('.')
      if (keys.length === 1) {
        data[keys[0]] = value
      } else if (keys.length === 2) {
        data[keys[0]][keys[1]] = value
      }
    }
  })
  return data
}

const fetchVisitRecord = async () => {
  try {
    const response = await fetch(`/api/visitation/get-visit-record/${route.params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const result = await response.json()
    if (result.success) {
      formData.value = parseInfoString(result.data.info_student)
    } else {
      error.value = '無法獲取訪視記錄'
    }
  } catch (err) {
    error.value = '請求失敗'
  } finally {
    loading.value = false
  }
}

onMounted(fetchVisitRecord)
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
  max-width: 800px;
  margin: 40px auto;
}

.page-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}
</style>

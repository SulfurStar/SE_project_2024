<template>
  <div class="page-container">
    <h1 class="page-title">訪視紀錄</h1>
    <form @submit.prevent="submitForm">
      <!-- 環境及作息評估 -->
      <div class="form-section">
        <h2>環境及作息評估（導師填寫）</h2>
        <div class="form-group">
          <label>押金要求:</label>
          <div class="form-options">
            <label>
              <input v-model="formData.environment.cleaning" type="radio" value="合理" /> 合理
            </label>
            <label>
              <input v-model="formData.environment.cleaning" type="radio" value="不合理" /> 不合理 (2個月以上之租金)
            </label>
          </div>
        </div>
        <div class="form-group">
          <label>水電費表:</label>
          <div class="form-options">
            <label>
              <input v-model="formData.environment.utilityBills" type="radio" value="合理" /> 合理
            </label>
            <label>
              <input v-model="formData.environment.utilityBills" type="radio" value="不合理" /> 不合理
            </label>
          </div>
        </div>
        <div class="form-group">
          <label>居家環境:</label>
          <div class="form-options">
            <label>
              <input v-model="formData.environment.landlordProvides" type="radio" value="佳" /> 佳
            </label>
            <label>
              <input v-model="formData.environment.landlordProvides" type="radio" value="適中" /> 適中
            </label>
            <label>
              <input v-model="formData.environment.landlordProvides" type="radio" value="欠佳" /> 欠佳
            </label>
          </div>
        </div>
        <div class="form-group">
          <label>生活設施:</label>
          <div class="form-options">
            <label>
              <input v-model="formData.environment.livingConditions" type="radio" value="佳" /> 佳
            </label>
            <label>
              <input v-model="formData.environment.livingConditions" type="radio" value="適中" /> 適中
            </label>
            <label>
              <input v-model="formData.environment.livingConditions" type="radio" value="欠佳" /> 欠佳
            </label>
          </div>
        </div>
        <div class="form-group">
          <label>訪視現況:</label>
          <div class="form-options">
            <label>
              <input v-model="formData.environment.contactMethod" type="radio" value="生活規律" /> 生活規律
            </label>
            <label>
              <input v-model="formData.environment.contactMethod" type="radio" value="適中" /> 適中
            </label>
            <label>
              <input v-model="formData.environment.contactMethod" type="radio" value="得加強" /> 得加強
            </label>
          </div>
        </div>
        <div class="form-group">
          <label>主客相處:</label>
          <div class="form-options">
            <label>
              <input v-model="formData.environment.visitSituation" type="radio" value="和諧" /> 和諧
            </label>
            <label>
              <input v-model="formData.environment.visitSituation" type="radio" value="欠佳" /> 欠佳
            </label>
          </div>
        </div>
      </div>

      <!-- 訪視結果 -->
      <div class="form-section">
        <h2>訪視結果（導師填寫）</h2>
        <div class="form-group">
          <div class="form-options">
            <label>
              <input v-model="formData.result.status" type="radio" value="整體實居狀況良好" /> 整體實居狀況良好
            </label>
            <label>
              <input v-model="formData.result.status" type="radio" value="聯繫家長關注" /> 聯繫家長關注
            </label>
            <label>
              <input v-model="formData.result.status" type="radio" value="安全隱患請協助" /> 安全隱患請協助
            </label>
          </div>
          <div>
            <label for="explanation">說明:</label>
            <input id="explanation" v-model="formData.result.explanation" type="text" />
          </div>
          <div>
            <label for="otherNotes">其他記載或建議事項:</label>
            <input id="otherNotes" v-model="formData.result.otherNotes" type="text" />
          </div>
        </div>
      </div>

      <!-- 關懷重點項目 -->
      <div class="form-section">
        <h2>關懷宣導項目（懇請導師訪視時多予關懷叮嚀）</h2>
        <div class="form-group">
          <div class="form-options">
            <label>
              <input v-model="formData.concernPoints.trafficSafety" type="checkbox" /> 交通安全
            </label>
            <label>
              <input v-model="formData.concernPoints.healthCondition" type="checkbox" /> 拒絕菸害
            </label>
            <label>
              <input v-model="formData.concernPoints.livingHabits" type="checkbox" /> 拒絕毒品
            </label>
            <label>
              <input v-model="formData.concernPoints.socialInteraction" type="checkbox" /> 登革熱防治
            </label>
          </div>
        </div>
      </div>

      <!-- 按鈕組 -->
      <div class="button-group">
        <button type="submit" class="confirm-button">確認</button>
        <button type="button" class="delete-button" @click="resetForm">取消</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  }
})

const formData = ref({
  environment: {
    cleaning: '',
    utilityBills: '',
    landlordProvides: '',
    livingConditions: '',
    contactMethod: '',
    visitSituation: ''
  },
  result: {
    status: '',
    explanation: '',
    otherNotes: ''
  },
  concernPoints: {
    trafficSafety: false,
    healthCondition: false,
    livingHabits: false,
    socialInteraction: false,
    other: false,
    explanation: ''
  }
});

const loading = ref(true)
const error = ref<string | null>(null)
const router = useRouter()
const route = useRoute()

const user = useState("user")

onMounted(() => {
  if (props.initialData) {
    formData.value = { ...formData.value, ...props.initialData }
  }
  loading.value = false
})

const submitForm = async () => {
  const formString = generateFormString(formData.value)
  try {
    const response = await fetch('/api/visitation/update-visit-record-teacher', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Id: route.params.id,
        info_teacher: formString,
        date_update: new Date().toISOString()
      }),
    });
    const result = await response.json();
    if (result.success) {
      alert('更新成功');
      router.push('/visitation');
    } else {
      alert('更新失敗');
    }
  } catch (error) {
    alert('更新時出錯: ' + error.message);
  }
};

const resetForm = () => {
  formData.value = {
    environment: {
      cleaning: '',
      utilityBills: '',
      landlordProvides: '',
      livingConditions: '',
      contactMethod: '',
      visitSituation: ''
    },
    result: {
      status: '',
      explanation: '',
      otherNotes: ''
    },
    concernPoints: {
      trafficSafety: false,
      healthCondition: false,
      livingHabits: false,
      socialInteraction: false,
      other: false,
      explanation: ''
    }
  }
}

const generateFormString = (data) => {
  const environment = data.environment;
  const result = data.result;
  const concernPoints = data.concernPoints;
  return `
    押金要求: ${environment.cleaning}
    水電費表: ${environment.utilityBills}
    居家環境: ${environment.landlordProvides}
    生活設施: ${environment.livingConditions}
    訪視現況: ${environment.contactMethod}
    主客相處: ${environment.visitSituation}
    
    訪視結果: ${result.status}
    說明: ${result.explanation}
    其他記載或建議事項: ${result.otherNotes}
    
    交通安全: ${concernPoints.trafficSafety}
    拒絕菸害: ${concernPoints.healthCondition}
    拒絕毒品: ${concernPoints.livingHabits}
    登革熱防治: ${concernPoints.socialInteraction}
  `;
};
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

.form-section {
  margin-bottom: 20px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  background-color: #ffffff;
}

.form-section h2 {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
  border-bottom: 2px solid #333;
  padding-bottom: 5px;
  font-weight: bold;
}

.form-group {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: #f1f1f1;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.form-group textarea {
  height: 100px;
}

.form-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.form-options label {
  margin-right: 10px;
}

.button-group {
  display: flex;
  gap: 20px;
}

.confirm-button,
.delete-button {
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

<template>
  <div class="page-container">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <form @submit.prevent="submitForm">
        <!-- 校外住宿資料 -->
        <div class="form-section">
          <h2>校外住宿資料（學生填寫）</h2>
          <div class="form-group">
            <label for="address">房東住址:</label>
            <input id="address" v-model="formData['房東住址']" type="text" />
          </div>
          <div class="form-group">
            <label for="phone">房東電話:</label>
            <input id="phone" v-model="formData['房東電話']" type="text" />
          </div>
          <div class="form-group">
            <label>住宿型態:</label>
            <div>
              <label>
                <input v-model="formData['住宿型態']" type="radio" value="獨棟透天" /> 獨棟透天
              </label>
              <label>
                <input v-model="formData['住宿型態']" type="radio" value="公寓(五樓以下)" /> 公寓(五樓以下)
              </label>
              <label>
                <input v-model="formData['住宿型態']" type="radio" value="大樓(六樓以上)" /> 大樓(六樓以上)
              </label>
              <label>
                <input v-model="formData['住宿型態']" type="radio" value="大型學舍(為學生提供的宿舍)" /> 大型學舍(為學生提供的宿舍)
              </label>
            </div>
          </div>
          <div class="form-group">
            <label for="monthlyRent">每月租金:</label>
            <input id="monthlyRent" v-model="formData['每月租金']" type="text" />
          </div>
          <div class="form-group">
            <label for="deposit">押金:</label>
            <input id="deposit" v-model="formData['押金']" type="text" />
          </div>
          <div class="form-group">
            <label>是否簽訂租賃契約:</label>
            <div>
              <label>
                <input v-model="formData['是否簽訂租賃契約']" type="radio" value="是" /> 是
              </label>
              <label>
                <input v-model="formData['是否簽訂租賃契約']" type="radio" value="否" /> 否
              </label>
            </div>
          </div>
        </div>

        <!-- 住宿安全自主管理檢視資料 -->
        <div class="form-section">
          <h2>住宿安全自主管理檢視資料（學生填寫）</h2>
          <div class="form-group">
            <label>木造隔間或鐵皮加蓋:</label>
            <div>
              <label>
                <input v-model="formData['木造隔間或鐵皮加蓋']" type="radio" value="是" /> 是
              </label>
              <label>
                <input v-model="formData['木造隔間或鐵皮加蓋']" type="radio" value="否" /> 否
              </label>
            </div>
          </div>
          <div class="form-group">
            <label>有火警警報器及滅火器:</label>
            <div>
              <label>
                <input v-model="formData['有火警警報器及滅火器']" type="radio" value="是" /> 是
              </label>
              <label>
                <input v-model="formData['有火警警報器及滅火器']" type="radio" value="否" /> 否
              </label>
            </div>
          </div>
          <div class="form-group">
            <label>逃生通道暢通且標示清楚:</label>
            <div>
              <label>
                <input v-model="formData['逃生通道暢通且標示清楚']" type="radio" value="是" /> 是
              </label>
              <label>
                <input v-model="formData['逃生通道暢通且標示清楚']" type="radio" value="否" /> 否
              </label>
            </div>
          </div>
          <div class="form-group">
            <label>門窗及鎖具良好:</label>
            <div>
              <label>
                <input v-model="formData['門窗及鎖具良好']" type="radio" value="是" /> 是
              </label>
              <label>
                <input v-model="formData['門窗及鎖具良好']" type="radio" value="否" /> 否
              </label>
            </div>
          </div>
          <div class="form-group">
            <label>有安裝照明設備（停電備用）:</label>
            <div>
              <label>
                <input v-model="formData['有安裝照明設備（停電備用）']" type="radio" value="是" /> 是
              </label>
              <label>
                <input v-model="formData['有安裝照明設備（停電備用）']" type="radio" value="否" /> 否
              </label>
            </div>
          </div>
          <div class="form-group">
            <label>租賃物為合法安全及符合消防規範:</label>
            <div>
              <label>
                <input v-model="formData['租賃物為合法安全及符合消防規範']" type="radio" value="是" /> 是
              </label>
              <label>
                <input v-model="formData['租賃物為合法安全及符合消防規範']" type="radio" value="否" /> 否
              </label>
            </div>
          </div>
          <div class="form-group">
            <label>熱水供應正常（如電鍋、清淨機、學校採暖設備）:</label>
            <div>
              <label>
                <input v-model="formData['熱水供應正常（如電鍋、清淨機、學校採暖設備）']" type="radio" value="是" /> 是
              </label>
              <label>
                <input v-model="formData['熱水供應正常（如電鍋、清淨機、學校採暖設備）']" type="radio" value="否" /> 否
              </label>
            </div>
          </div>
          <div class="form-group">
            <label>使用多種電器（高耗能），是否同時插在同一條延長線上:</label>
            <div>
              <label>
                <input v-model="formData['使用多種電器（高耗能），是否同時插在同一條延長線上']" type="radio" value="是" /> 是
              </label>
              <label>
                <input v-model="formData['使用多種電器（高耗能），是否同時插在同一條延長線上']" type="radio" value="否" /> 否
              </label>
            </div>
          </div>
          <div class="form-group">
            <label>有流水號且功能正常:</label>
            <div>
              <label>
                <input v-model="formData['有流水號且功能正常']" type="radio" value="是" /> 是
              </label>
              <label>
                <input v-model="formData['有流水號且功能正常']" type="radio" value="否" /> 否
              </label>
            </div>
          </div>
          <div class="form-group">
            <label>煤氣罐（或熱水器、瓦斯爐）安全良好，無一氧化碳中毒疑慮:</label>
            <div>
              <label>
                <input v-model="formData['煤氣罐（或熱水器、瓦斯爐）安全良好，無一氧化碳中毒疑慮']" type="radio" value="是" /> 是
              </label>
              <label>
                <input v-model="formData['煤氣罐（或熱水器、瓦斯爐）安全良好，無一氧化碳中毒疑慮']" type="radio" value="否" /> 否
              </label>
            </div>
          </div>
          <div class="form-group">
            <label>分間6個以上房間數10個以上床位:</label>
            <div>
              <label>
                <input v-model="formData['分間6個以上房間數10個以上床位']" type="radio" value="是" /> 是
              </label>
              <label>
                <input v-model="formData['分間6個以上房間數10個以上床位']" type="radio" value="否" /> 否
              </label>
            </div>
          </div>
          <div class="form-group">
            <label>有安裝照明設備（停電備用）:</label>
            <div>
              <label>
                <input v-model="formData['有安裝照明設備（停電備用）']" type="radio" value="是" /> 是
              </label>
              <label>
                <input v-model="formData['有安裝照明設備（停電備用）']" type="radio" value="否" /> 否
              </label>
            </div>
          </div>
          <div class="form-group">
            <label>使用低故障率或變化度低的電子鎖:</label>
            <div>
              <label>
                <input v-model="formData['使用低故障率或變化度低的電子鎖']" type="radio" value="是" /> 是
              </label>
              <label>
                <input v-model="formData['使用低故障率或變化度低的電子鎖']" type="radio" value="否" /> 否
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const formData = ref({
  '房東住址': '',
  '房東電話': '',
  '住宿型態': '',
  '每月租金': '',
  '押金': '',
  '是否簽訂租賃契約': '',
  '木造隔間或鐵皮加蓋': '',
  '有火警警報器及滅火器': '',
  '逃生通道暢通且標示清楚': '',
  '門窗及鎖具良好': '',
  '有安裝照明設備（停電備用）': '',
  '租賃物為合法安全及符合消防規範': '',
  '熱水供應正常（如電鍋、清淨機、學校採暖設備）': '',
  '使用多種電器（高耗能），是否同時插在同一條延長線上': '',
  '有流水號且功能正常': '',
  '煤氣罐（或熱水器、瓦斯爐）安全良好，無一氧化碳中毒疑慮': '',
  '分間6個以上房間數10個以上床位': '',
  '有安裝照明設備（停電備用）': '',
  '使用低故障率或變化度低的電子鎖': ''
})

const loading = ref(true)
const error = ref<string | null>(null)
const route = useRoute()

const parseInfoString = (infoString: string) => {
  const lines = infoString.split('\n').map(line => line.trim())
  const data: { [key: string]: string } = {}

  lines.forEach(line => {
    const [key, value] = line.split(':')
    if (key && value !== undefined) {
      data[key.trim()] = value.trim()
    }
  })

  Object.keys(formData.value).forEach(key => {
    formData.value[key] = data[key] || ''
  })
}

const fetchVisitRecord = async () => {
  try {
    const response = await fetch(`/api/visitation/get-visit-record/${route.params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await response.json()
    if (result.success) {
      parseInfoString(result.data.info_student)
    } else {
      error.value = '無法獲取訪視記錄'
    }
  } catch (err) {
    error.value = '請求失敗'
  } finally {
    loading.value = false
  }
}

const submitForm = async () => {
  const formString = generateFormString(formData.value)
  const currentDate = new Date().toISOString()
  try {
    const response = await fetch('/api/visitation/update-visit-record-student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: route.params.id,
        info_student: formString,
        date_update: currentDate
      }),
    })
    const result = await response.json()
    if (result.success) {
      alert('更新成功')
    } else {
      alert('更新失敗')
    }
  } catch (error) {
    alert('更新時出錯: ' + error.message)
  }
  router.push('/visitation')
}

const resetForm = () => {
  
  router.push('/visitation')
}

const generateFormString = (data) => {
  return Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n')
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

.form-section {
  margin-bottom: 20px;
  width: 100%;
}

.form-section h2 {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
  border-bottom: 2px solid #333;
  padding-bottom: 5px;
}

.form-group {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
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

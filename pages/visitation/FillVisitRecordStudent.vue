<template>
  <div class="page-container">
    <h1 class="page-title">訪視紀錄</h1>
    <form @submit.prevent="submitForm">
      <!-- 校外住宿資料 -->
      <div class="form-section">
        <h2>校外住宿資料（學生填寫）</h2>
        <div class="form-group">
          <label for="address">房東住址:</label>
          <input id="address" v-model="formData.address" type="text" />
        </div>
        <div class="form-group">
          <label for="phone">房東電話:</label>
          <input id="phone" v-model="formData.phone" type="text" />
        </div>
        <div class="form-group houseType">
          <label class="groupEnd">住宿型態:</label>
          <div class="content">
            <div>
              <label>
                <input v-model="formData.accommodationType" type="radio" value="獨棟透天" /> 獨棟透天
              </label>
              <label>
                <input v-model="formData.accommodationType" type="radio" value="公寓(五樓以下)" /> 公寓(五樓以下)
              </label>
            </div>
            <div>
              <label>
                <input v-model="formData.accommodationType" type="radio" value="大樓(六樓以上)" /> 大樓(六樓以上)
              </label>
              <label>
                <input v-model="formData.accommodationType" type="radio" value="大型學舍(為學生提供的宿舍)" /> 大型學舍(為學生提供的宿舍)
              </label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="monthlyRent" class="groupEnd">每月租金:</label>
          <input id="monthlyRent" v-model="formData.monthlyRent" type="text" />
        </div>
        <div class="form-group">
          <label for="deposit">押金:</label>
          <input id="deposit" v-model="formData.deposit" type="text" />
        </div>
        <div class="form-group houseType">
          <label class="groupEnd">是否簽訂租賃契約:</label>
          <div class="content">
            <label>
              <input v-model="formData.hasContract" type="radio" value="是" /> 是
            </label>
            <label>
              <input v-model="formData.hasContract" type="radio" value="否" /> 否
            </label>
          </div>
        </div>
      </div>
      <br>
      <br>
      <!-- 住宿安全自主管理檢視資料 -->
      <div class="form-section">
        <h2>住宿安全自主管理檢視資料（學生填寫）</h2>
        <div class="form-group houseType">
          <label>木造隔間或鐵皮加蓋:</label>
          <div class="content">
            <label>
              <input v-model="formData.safety.woodenPartition" type="radio" value="是" /> 是
            </label>
            <label>
              <input v-model="formData.safety.woodenPartition" type="radio" value="否" /> 否
            </label>
          </div>
        </div>
        <div class="form-group houseType">
          <label class="groupEnd">有火警警報器及滅火器:</label>
          <div class="content">
            <label>
              <input v-model="formData.safety.fireAlarmExtinguisher" type="radio" value="是" /> 是
            </label>
            <label>
              <input v-model="formData.safety.fireAlarmExtinguisher" type="radio" value="否" /> 否
            </label>
          </div>
        </div>
        <div class="form-group houseType">
          <label class="groupEnd">逃生通道暢通且標示清楚:</label>
          <div class="content">
            <label>
              <input v-model="formData.safety.emergencyExit" type="radio" value="是" /> 是
            </label>
            <label>
              <input v-model="formData.safety.emergencyExit" type="radio" value="否" /> 否
            </label>
          </div>
        </div>
        <div class="form-group houseType">
          <label class="groupEnd">門窗及鎖具良好:</label>
          <div class="content">
            <label>
              <input v-model="formData.safety.windowsDoorsLocks" type="radio" value="是" /> 是
            </label>
            <label>
              <input v-model="formData.safety.windowsDoorsLocks" type="radio" value="否" /> 否
            </label>
          </div>
        </div>
        <div class="form-group houseType">
          <label class="groupEnd">有安裝照明設備（停電備用）:</label>
          <div class="content">
            <label>
              <input v-model="formData.safety.lightingEquipment" type="radio" value="是" /> 是
            </label>
            <label>
              <input v-model="formData.safety.lightingEquipment" type="radio" value="否" /> 否
            </label>
          </div>
        </div>
        <div class="form-group  houseType">
          <label class="groupEnd">租賃物為合法安全及符合消防規範:</label>
          <div class="content">
            <label>
              <input v-model="formData.safety.legalSafetyCompliance" type="radio" value="是" /> 是
            </label>
            <label>
              <input v-model="formData.safety.legalSafetyCompliance" type="radio" value="否" /> 否
            </label>
          </div>
        </div>
        <div class="form-group">
          <label class="groupEnd">熱水供應正常（如電鍋、清淨機、學校採暖設備）:</label>
          <div>
            <label>
              <input v-model="formData.safety.hotWaterSupply" type="radio" value="是" /> 是
            </label>
            <label>
              <input v-model="formData.safety.hotWaterSupply" type="radio" value="否" /> 否
            </label>
          </div>
        </div>
        <div class="form-group">
          <label class="groupEnd">使用多種電器（高耗能），是否同時插在同一條延長線上:</label>
          <div>
            <label>
              <input v-model="formData.safety.multiElectricalAppliances" type="radio" value="是" /> 是
            </label>
            <label>
              <input v-model="formData.safety.multiElectricalAppliances" type="radio" value="否" /> 否
            </label>
          </div>
        </div>
        <div class="form-group">
          <label class="groupEnd">有流水號且功能正常:</label>
          <div>
            <label>
              <input v-model="formData.safety.runningWaterFunctionality" type="radio" value="是" /> 是
            </label>
            <label>
              <input v-model="formData.safety.runningWaterFunctionality" type="radio" value="否" /> 否
            </label>
          </div>
        </div>
        <div class="form-group">
          <label class="groupEnd">煤氣罐（或熱水器、瓦斯爐）安全良好，無一氧化碳中毒疑慮:</label>
          <div>
            <label>
              <input v-model="formData.safety.gasSafety" type="radio" value="是" /> 是
            </label>
            <label>
              <input v-model="formData.safety.gasSafety" type="radio" value="否" /> 否
            </label>
          </div>
        </div>
        <div class="form-group">
          <label class="groupEnd">分間6個以上房間數10個以上床位:</label>
          <div>
            <label>
              <input v-model="formData.safety.roomCount" type="radio" value="是" /> 是
            </label>
            <label>
              <input v-model="formData.safety.roomCount" type="radio" value="否" /> 否
            </label>
          </div>
        </div>
        <div class="form-group">
          <label class="groupEnd">使用低故障率或變化度低的電子鎖:</label>
          <div>
            <label>
              <input v-model="formData.safety.electronicLock" type="radio" value="是" /> 是
            </label>
            <label>
              <input v-model="formData.safety.electronicLock" type="radio" value="否" /> 否
            </label>
          </div>
        </div>
      </div>
      <div class="groupEnd"></div>
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
import { useRouter } from 'vue-router'
import { useState } from '#app'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  }
})

const formData = ref({
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
    electronicLock: ''
  }
});

const user = useState('user');
const router = useRouter();
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(() => {
  if (props.initialData) {
    formData.value = { ...formData.value, ...props.initialData }
  }
  loading.value = false
})

const submitForm = async () => {
  const formString = generateFormString(formData.value)
  const currentDate = new Date().toISOString();
  try {
    const response = await fetch('/api/visitation/update-visit-record-student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.value.id,
        info_student: formString,
        date_update: currentDate
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
  formData.value = { ...formData.value, ...props.initialData }
}

const generateFormString = (data) => {
  const safety = data.safety;
  return `
    房東住址: ${data.address}
    房東電話: ${data.phone}
    住宿型態: ${data.accommodationType}
    每月租金: ${data.monthlyRent}
    押金: ${data.deposit}
    是否簽訂租賃契約: ${data.hasContract}
    
    木造隔間或鐵皮加蓋: ${safety.woodenPartition}
    有火警警報器及滅火器: ${safety.fireAlarmExtinguisher}
    逃生通道暢通且標示清楚: ${safety.emergencyExit}
    門窗及鎖具良好: ${safety.windowsDoorsLocks}
    有安裝照明設備（停電備用）: ${safety.lightingEquipment}
    租賃物為合法安全及符合消防規範: ${safety.legalSafetyCompliance}
    熱水供應正常（如電鍋、清淨機、學校採暖設備）: ${safety.hotWaterSupply}
    使用多種電器（高耗能），是否同時插在同一條延長線上: ${safety.multiElectricalAppliances}
    有流水號且功能正常: ${safety.runningWaterFunctionality}
    煤氣罐（或熱水器、瓦斯爐）安全良好，無一氧化碳中毒疑慮: ${safety.gasSafety}
    分間6個以上房間數10個以上床位: ${safety.roomCount}
    使用低故障率或變化度低的電子鎖: ${safety.electronicLock}
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
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}

.groupEnd {
  padding-top: 5px;
  border-top: 2px solid #333;
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

.houseType{
  width: 100%;
}

.houseType .content{
  text-align: center;
  display: flex;
  align-content: space-between;
  justify-content: space-around;
  gap: 20px;
}
</style>

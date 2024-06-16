<template>
  <div class="page-container">
    <h1 class="page-title">填寫訪視時間</h1>
    <div class="input-container">
      <el-date-picker
        v-model="value1"
        :picker-options="{ disabledDate }"
        type="datetime"
        placeholder="請選擇日期"
        style="width: 100%;height: 50px;"
      />
    </div>
    <div class="button-group">
      <el-button type="primary" @click="confirmTime">確認</el-button>
      <el-button  @click="deleteTime">取消</el-button>
    </div>
  </div>
</template>

<script setup >
import { ref } from 'vue';
import { useRoute,useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const visitTableId = route.params.id;
const user = useState('user');
const userId = ref("");
const value1 = ref('');
watch(
  () => user.value,
  (newUser) => {
    if (newUser) {
      userId.value = newUser.id;
    }
  },
  { immediate: true }
);

const disabledDate = (time) => {
  return time.getTime() <= Date.now();
};

const confirmTime = async () => {
  const response = await fetch(`/api/visitation/confirm-visit-time`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      visitTime: value1.value,
      visitTableId,
    }),
  });
  const data = await response.json();
  if (data.success === false) {
    ElMessage({
        message: '新增訪視預約時出錯: ' + data.error,
        type: "error",
    });
  } else {
    ElMessage({
        message: "訪視預約已更新",
        type: "success",
    });
    router.push('/visitation');
  }
};

// const updateTimeString = () => {
//   if (selectedTime.value) {
//     const date = new Date(selectedTime.value);
//     timeString.value = date.toLocaleString('zh-TW', {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   }
// };

// const submitTime = async () => {
//   const response = await fetch(`/api/visitation/confirm-visit-time`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       teacherId: userId.value,
//       visitAddress: document.getElementById("address-input").value
//     }),
//   });
//   const data = await response.json();
//   if (data.success === false) {
//     ElMessage({
//         message: '新增訪視預約時出錯: ' + data.error,
//         type: "error",
//     });
//   } else {
//     ElMessage({
//         message: "訪視預約已更新",
//         type: "success",
//     });
//     router.push('/visitation');
//   }
// };

// const deleteTime = () => {
//   selectedTime.value = '';
//   timeString.value = '';
// };
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

.time-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ced4da;
  margin-bottom: 10px;
}

.time-string {
  font-size: 16px;
  color: #333;
  background-color: #e9ecef;
  padding: 10px;
  border-radius: 8px;
  width: 100%;
  text-align: center;
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

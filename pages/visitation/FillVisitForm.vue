<template>
  <div class="page-container">
    <h1 class="page-title">填寫訪視問卷</h1>
    <!-- {{ User.id }} -->
    <!-- <div>當前使用者ID: {{ userId }}</div> -->
    <div class="input-container">
      <input id="address-input" class="address-input" type="text" placeholder="請輸入地址" />
      <!-- <div v-if="address" class="address-string">{{ address }}</div> -->
    </div>
    <div class="button-group">
      <button class="confirm-button" @click="submitForm">確認</button>
      <button class="delete-button" @click="cancel">取消</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const user = useState('user');
const userId = ref("");
watch(
  () => user.value,
  (newUser) => {
    if (newUser) {
      userId.value = newUser.id;
    }
  },
  { immediate: true }
);


const router = useRouter();
// 
const cancel = () => {
  router.push('/visitation');
};

// funtion to create a new visitation record
const submitForm = async () => {
  const response = await fetch(`/api/visitation/create-visit-form`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      studentId: userId.value,
      visitAddress: document.getElementById("address-input").value
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

onMounted(() => {
  
});

// const initAutocomplete = () => {
//   const input = document.getElementById("address-input") as HTMLInputElement
//   const autocomplete = new google.maps.places.Autocomplete(input)

//   autocomplete.addListener("place_changed", () => {
//     const place = autocomplete.getPlace()
//     if (place.formatted_address) {
//       address.value = place.formatted_address
//     } else {
//       alert("No address found")
//     }
//   })
// }

// const getUser = async () => {
//   const { data: { user } } = await supabase.auth.getUser()
//   if (user) {
//     userId.value = user.id
//   }
// }

// const confirmAddress = async () => {
//   if (!userId.value) {
//     alert('用戶未登入')
//     return
//   }
//   const { error } = await supabase
//     .from('visit_table')
//     .update({ visit_address: address.value })
//     .eq('studentId', userId.value)
//   if (error) {
//     alert('更新地址時出錯: ' + error.message)
//   } else {
//     alert('地址已確認: ' + address.value)
//     router.push('/visitation')
//   }
// }

// const cancel = () => {
//   router.push('/visitation')
// }
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

.address-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ced4da;
  margin-bottom: 10px;
}

.address-string {
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


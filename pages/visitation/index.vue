<template>
  <div class="page-container">
    <div v-if="loading">Loading user data...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-if="user.role === 'LANDLORD'">
        <h2>房東不可查看</h2>
      </div>
      <div v-else>
        <div class="button-block">
          <h2 class="block-title">訪視問卷</h2>
          <div class="button-container">
            <nuxt-link v-for="button in mainButtons" :key="button.id" :to="button.url" class="button-link">
              <button class="styled-button">{{ button.name }}</button>
            </nuxt-link>
          </div>
        </div>
        <div class="button-block">
          <h2 class="block-title">訪視紀錄</h2>
          <div class="button-container">
            <nuxt-link v-for="button in otherButtons" :key="button.id" :to="button.url" class="button-link">
              <button class="styled-button">{{ button.name }}</button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// import { useRouter } from 'vue-router';

// const router = useRouter();
const loading = ref(true);
const error = ref(null);
const user = useState('user');
const userId = ref("");
const userRole = ref("");
watch(
  () => user.value,
  (newUser) => {
    if (newUser) {
      userId.value = newUser.id;
      userRole.value = newUser.role;
    }
  },
  { immediate: true }
);

// 定义按钮列表
const buttons = ref([
  { id: 1, name: '填寫地址', url: '/visitation/FillVisitForm' },
  { id: 2, name: '選擇訪視時間', url: '/visitation/overview/1' },
  { id: 3, name: '學生填寫訪視紀錄', url: '/visitation/FillVisitRecordStudent' },
  { id: 4, name: '學生修改訪視紀錄', url: `/visitation/UpdateVisitRecordStudent/${user.value ? user.value.id : ''}` }, // 动态路由
  { id: 5, name: '學生查詢訪視紀錄', url: '/visitation/SearchVisitStudent' },
  { id: 9, name: '老師填寫訪視紀錄', url: '/visitation/TeacherSearchStudentRecord' },
  { id: 10, name: '老師修改訪視紀錄', url: `/visitation/UpdateVisitRecordTeacher/${user.value ? user.value.id : ''}` },
  { id: 6, name: '刪除訪視紀錄', url: '/visitation/DeleteVisitRecord' },
  { id: 7, name: '老師查詢訪視紀錄', url: `/visitation/VisitationCheck/${user.value ? user.value.id : ''}` },
  { id: 8, name: '管理員查詢訪視紀錄', url: '/visitation/VisitCheckAdmin' },
  
]);


const mainButtons = ref([]);
const otherButtons = ref([]);

onMounted(() => {
  if (!user.value) {
    error.value = 'User not found';
    loading.value = false;
  } else {
    console.log('User data:', user.value);
    loading.value = false;

    // 根据角色筛选按钮
    if (userRole.value === 'ADMIN') {
      mainButtons.value = buttons.value.filter(button => button.id === 1 || button.id === 2);
      otherButtons.value = buttons.value.filter(button => button.id !== 1 && button.id !== 2  && button.id !== 5  && button.id !== 7 );
    }
    else if(userRole.value === 'STUDENT'){
      mainButtons.value = buttons.value.filter(button => button.id === 1 );
      otherButtons.value = buttons.value.filter(button => button.id === 3 ||button.id === 4||button.id === 5);
    }
    else if(userRole.value === 'TEACHER'){
      mainButtons.value = buttons.value.filter(button => button.id === 2 );
      otherButtons.value = buttons.value.filter(button => button.id === 9 ||button.id === 10||button.id === 7);
    }
    else if (userRole.value === 'LANDLORD') {
      mainButtons.value = [];
      otherButtons.value = [];
    }
  }
});

definePageMeta({
  middleware: 'auth',
});
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

.button-block {
  width: 100%;
  margin-bottom: 20px;
}

.block-title {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.button-link {
  text-decoration: none;
}

.styled-button {
  background-color: #007BFF;
  border: none;
  border-radius: 8px;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.styled-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.styled-button:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.5);
}
</style>

<template>
  <div class="my-adverts-container">
    <h1 class="text-2xl font-bold mb-4">我的廣告</h1>
    <div v-if="loading" class="text-center text-gray-500">
      Loading adverts...
    </div>
    <div v-else>
      <div class="actions flex items-center mb-4">
        <el-checkbox v-model="selectAll" @change="toggleSelectAll"
          >全選</el-checkbox
        >
        <el-button type="danger" class="ml-4" @click="deleteSelected"
          >刪除選擇</el-button
        >
      </div>
      <div
        class="list-header flex justify-between p-2 bg-gray-100 border-b border-gray-300 font-bold"
      >
        <span class="w-4/12">選擇</span>
        <span class="w-5/12">標題</span>
        <span class="w-5/12">地址</span>
        <span class="w-1/12">操作</span>
      </div>
      <ul class="advert-list">
        <li
          v-for="advert in adverts"
          :key="advert.id"
          class="advert-item flex justify-between items-center p-2 border-b border-gray-200"
        >
          <el-checkbox
            v-model="selectedAdverts"
            :value="advert.id"
            class="w-1/12 flex items-center justify-center"
          ></el-checkbox>
          <strong
            class="advert-title w-5/12 flex items-center justify-center"
            >{{ advert.title }}</strong
          >
          <span
            class="advert-address w-5/12 flex items-center justify-center"
            >{{ advert.address }}</span
          >
          <el-button
            type="primary"
            class="w-1/12 flex items-center justify-center"
            @click="editAdvert(advert.id)"
            >編輯</el-button
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const adverts = ref([]);
const loading = ref(true);
const selectAll = ref(false);
const selectedAdverts = ref([]);
const router = useRouter();
const user = useState("user");
const userId = ref("");

// 定義 fetchAdverts 函數
const fetchAdverts = async () => {
  if (!userId.value) return;

  try {
    const response = await fetch(
      `/api/ad/getUserAdverts?userId=${userId.value}`
    );
    const data = await response.json();
    if (Array.isArray(data)) {
      adverts.value = data;
    } else {
      adverts.value = [];
    }
  } catch (error) {
    console.error("Error fetching adverts:", error);
    ElMessage.error("獲取廣告時出錯");
  } finally {
    loading.value = false;
  }
};

// 使用 watchEffect 在 userId 更新后调用 fetchAdverts
watchEffect(async () => {
  if (user.value && user.value.id) {
    userId.value = user.value.id;
    await fetchAdverts();
  }
});

const editAdvert = (advertId) => {
  router.push(`/Ad/Ad_modify/${advertId}`);
};

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedAdverts.value = adverts.value.map((advert) => advert.id);
  } else {
    selectedAdverts.value = [];
  }
};

watch(selectAll, (newVal) => {
  if (newVal) {
    selectedAdverts.value = adverts.value.map((advert) => advert.id);
  } else {
    selectedAdverts.value = [];
  }
});

const deleteSelected = async () => {
  if (selectedAdverts.value.length === 0) {
    ElMessage.warning("請選擇要刪除的廣告");
    return;
  }

  try {
    const response = await fetch("/api/ad/delete-ad", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: selectedAdverts.value }),
    });

    if (!response.ok) {
      throw new Error("刪除廣告時出錯");
    }

    ElMessage.success("廣告刪除成功");

    // 刪除成功後刷新廣告列表
    await fetchAdverts();
    // 清空選中的廣告
    selectedAdverts.value = [];
    selectAll.value = false;
  } catch (error) {
    console.error("Error deleting adverts:", error);
    ElMessage.error("刪除廣告時出錯");
  }
};
</script>

<style scoped>
.my-adverts-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #999;
}

.actions {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.list-header {
  display: flex;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}

.advert-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.advert-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 1rem;
  margin: 0.5rem 0;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.advert-title {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.advert-address {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 2;
}

.el-button {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

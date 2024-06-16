<!-- 管理員審核廣告 -->
<template>
  <div class="verify-ad-container">
    <h1>Verify Adverts</h1>
    <div v-if="loading">Loading adverts...</div>
    <div v-else>
      <ul>
        <li v-for="advert in adverts" :key="advert.id">
          <strong>{{ advert.title }}</strong> - {{ advert.address }}
          <el-button type="primary" @click="checkAdvert(advert.id)">Check</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const adverts = ref([]);
const loading = ref(true);
const router = useRouter();

const fetchAdverts = async () => {
  try {
    const response = await fetch('/api/ad/getUnknownAdverts');
    const data = await response.json();
    adverts.value = data;
  } catch (error) {
    console.error('Error fetching adverts:', error);
  } finally {
    loading.value = false;
  }
};

const checkAdvert = (advertId) => {
  router.push(`/Ad/Ad_check/${advertId}`);
};

onMounted(fetchAdverts);
</script>

<style scoped>
.verify-ad-container {
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

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin: 0.5rem 0;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.el-button {
  margin-left: 1rem;
}
</style>

<template>
  <div class="check-ad-container">
    <h1 class="text-2xl font-bold text-center mb-6">Check Advertise</h1>
    <div v-if="loading" class="text-center text-gray-500">
      Loading advertise data...
    </div>
    <div v-else>
      <div v-for="(value, key) in advertise" :key="key" class="mb-4">
        <div v-if="!excludeKeys.includes(key)">
          <label :for="key" class="font-semibold">{{ key }}</label>
          <template v-if="Array.isArray(value)">
            <div v-for="(url, index) in value" :key="index">
              <img v-if="isImageUrl(url)" :src="url" class="advertise-image" />
              <p v-else>{{ url }}</p>
            </div>
          </template>
          <p v-else :id="key">{{ formatValue(value) }}</p>
        </div>
      </div>
      <button class="approve-button" @click="approveAdvertise">批准廣告</button>
      <button class="reject-button" @click="rejectAdvertise">不批准廣告</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";

const advertise = ref({});
const loading = ref(true);
const router = useRouter();
const route = useRoute();

const excludeKeys = ["id", "createdAt", "updatedAt", "authorId"];

const fetchAdvertise = async () => {
  try {
    const response = await fetch(`/api/ad/getAdvertiseData/${route.params.id}`);
    const data = await response.json();
    advertise.value = data;
  } catch (error) {
    console.error("Error fetching advertise data:", error);
  } finally {
    loading.value = false;
  }
};

const formatValue = (value) => {
  if (typeof value === "boolean") {
    return value ? "是" : "否";
  }
  return value || "N/A";
};

const isImageUrl = (url) => {
  return /\.(jpg|jpeg|png|gif|bmp)$/i.test(url);
};

const approveAdvertise = async () => {
  try {
    const response = await fetch(
      `/api/ad/approveAdvertise/${route.params.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verify: "ADOPTED" }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to approve advertise");
    }

    const data = await response.json();

    ElMessage({
      message: "廣告已批准",
      type: "success",
    });

    router.push("/Ad/Ad_verify");
  } catch (error) {
    console.error("Error approving advertise:", error);
    ElMessage({
      message: "批准失敗",
      type: "error",
    });
  }
};

const rejectAdvertise = async () => {
  try {
    const response = await fetch(
      `/api/ad/approveAdvertise/${route.params.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verify: "FAILED" }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to reject advertise");
    }

    const data = await response.json();

    ElMessage({
      message: "廣告未批准",
      type: "success",
    });

    router.push("/Ad/Ad_verify");
  } catch (error) {
    console.error("Error rejecting advertise:", error);
    ElMessage({
      message: "不批准失敗",
      type: "error",
    });
  }
};

onMounted(fetchAdvertise);
</script>

<style scoped>
.check-ad-container {
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

.text-center {
  text-align: center;
}

.text-gray-500 {
  color: #6b7280;
}

label {
  font-weight: bold;
  margin-top: 1rem;
}

p {
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.advertise-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  margin-top: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

button {
  margin-top: 2rem;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 1rem;
}

.approve-button {
  background-color: #007bff;
}

.reject-button {
  background-color: #dc3545;
}
</style>

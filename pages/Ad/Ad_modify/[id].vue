<template>
  <div class="edit-ad-container">
    <h1>編輯廣告</h1>
    <div v-if="loading">正在加載廣告數據...</div>
    <div v-else>
      <form @submit.prevent="updateAdvertise">
        <div v-for="(value, key) in advertise" :key="key">
          <div v-if="!excludeKeys.includes(key)">
            <label :for="key">{{ getLabel(key) }}</label>
            <template v-if="isBooleanField(key)">
              <input
                :id="key"
                v-model="advertise[key]"
                type="checkbox"
                class="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md"
              />
            </template>
            <template v-else>
              <input
                :id="key"
                v-model="advertise[key]"
                :placeholder="getPlaceholder(key)"
                class="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md"
              />
            </template>
          </div>
        </div>
        <div class="image-upload-section">
          <h2>圖片管理</h2>
          <div class="image-list">
            <div
              v-for="(image, index) in advertise.images"
              :key="index"
              class="relative image-item"
            >
              <button
                type="button"
                class="absolute top-0 right-0 m-2 remove-button"
                @click="removeImage(index)"
              >
                <el-icon><delete /></el-icon>
              </button>
              <br />
              <img :src="image" alt="Advert Image" class="advert-image" />
            </div>
          </div>
          <el-upload
            class="upload-demo"
            :http-request="uploadImage"
            :on-success="handleUploadSuccess"
            :file-list="fileList"
          >
            <el-button type="primary">上傳圖片</el-button>
          </el-upload>
        </div>
        <button type="submit">確認修改</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessage, ElIcon } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import { v4 as uuidv4 } from "uuid";

const advertise = ref({});
const loading = ref(true);
const fileList = ref([]);
const router = useRouter();
const route = useRoute(); // 獲取動態路由參數

// 不應顯示在表單中的屬性
const excludeKeys = [
  "id",
  "createdAt",
  "updatedAt",
  "authorId",
  "verify",
  "images",
];

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

const getPlaceholder = (key) => {
  switch (key) {
    case "title":
      return "廣告標題";
    case "phone":
      return "電話";
    case "address":
      return "地址";
    // 根據需求添加更多的佔位符
    default:
      return "";
  }
};

const isBooleanField = (key) => {
  const booleanFields = [
    "noroom",
    "reserve",
    "telev",
    "fridge",
    "aircond",
    "washmch",
    "clothdry",
    "waterdisp",
    "wardrobe",
    "singlebed",
    "doublebea",
    "desk",
    "internet",
  ];
  return booleanFields.includes(key);
};

// AD各屬性中英對照
const getLabel = (key) => {
  const labels = {
    title: "廣告標題",
    phone: "電話",
    noroom: "目前滿租",
    reserve: "可預約",
    rental_rm: "出租房數",
    buildtype: "房屋類型",
    rm_type: "出租類型",
    rent_low: "租金_最低",
    rent_high: "租金_最高",
    deposit: "押金",
    other_fee: "其他費用",
    floor: "建物樓層",
    indp_mete: "獨立電表",
    part_mate: "隔間材質",
    gender: "性別要求",
    Smoke_fre: "無菸租屋",
    identity: "身份要求",
    telev: "電視",
    fridge: "冰箱",
    aircond: "冷氣",
    washmch: "洗衣機",
    clothdry: "烘衣機",
    waterdisp: "飲水機",
    wardrobe: "衣櫃",
    singlebed: "單人床",
    doublebea: "雙人床",
    desk: "書桌",
    internet: "寬頻網路",
    pub_equi: "公共設備",
    condition: "屋況說明",
    heater: "熱水器",
    safe_faci: "安全設施",
    certified: "證明文件",
    houseAge: "屋齡",
    endAt: "下架時間",
    verify: "廣告狀態",
    address: "地址",
  };
  return labels[key] || key;
};

const updateAdvertise = async () => {
  try {
    const response = await fetch(`/api/ad/updateAdvertise/${route.params.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(advertise.value),
    });

    if (!response.ok) {
      throw new Error("Failed to update advertise");
    }

    const data = await response.json();

    console.log("Advertise updated successfully:", data);

    ElMessage({
      message: "修改成功",
      type: "success",
    });

    router.push("/Ad/Ad_manage"); // 更新完成后跳转回用户管理页面
  } catch (error) {
    console.error("Error updating advertise:", error);
    ElMessage({
      message: "修改失敗",
      type: "error",
    });
  }
};

const handleUploadSuccess = (response, file, fileList) => {
  advertise.value.images.push(response.url);
};

const removeImage = (index) => {
  advertise.value.images.splice(index, 1);
};

const uploadImage = async ({ file }) => {
  try {
    const uniqueFileName = `${uuidv4()}.${file.name.split(".").pop()}`;
    const supabase = useSupabaseClient();
    const { data, error } = await supabase.storage
      .from("PostPhoto")
      .upload(`public/${uniqueFileName}`, file);

    if (error) {
      console.error("圖片上傳失敗:", error);
      return null;
    }

    const { data: urlData, error: urlError } = supabase.storage
      .from("PostPhoto")
      .getPublicUrl(`public/${uniqueFileName}`);
    if (urlError) {
      console.error("獲取圖片URL失敗:", urlError);
      return null;
    }

    const imageURL = urlData.publicUrl;
    console.log("圖片上傳成功，圖片URL:", imageURL);
    return { url: imageURL };
  } catch (error) {
    console.error("圖片上傳過程中出現錯誤:", error);
    return null;
  }
};

onMounted(fetchAdvertise);
</script>

<style scoped>
.edit-ad-container {
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

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 1rem;
}

input[type="text"],
input[type="checkbox"] {
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  margin-top: 2rem;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.image-upload-section {
  margin-top: 2rem;
}

.image-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.image-item {
  position: relative;
}

.advert-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.remove-button {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>

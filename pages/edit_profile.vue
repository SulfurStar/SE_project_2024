<template>
  <div class="edit-profile-container">
    <h1>Edit Profile</h1>
    <form @submit.prevent="updateProfile">
      <div v-for="(value, key) in user" :key="key">
        <div v-if="!excludeKeys.includes(key)">
          <label :for="key">{{ key }}</label>
          <input
            :id="key"
            v-model="user[key]"
            :pattern="getPattern(key)"
            :placeholder="getPlaceholder(key)"
            class="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <button type="submit">確認修改</button>
    </form>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";

const user = useState("user");
const router = useRouter();
// 不應顯示在表單中的屬性
const excludeKeys = ["avatar", "exists", "role", "id"];

// 讓學生無法修改name和email
onMounted(() => {
  if (user.value && user.value.role === "STUDENT") {
    excludeKeys.push("name");
    excludeKeys.push("email");
  }
  console.log("User data:", user.value);
});

const getPlaceholder = (key) => {
  switch (key) {
    case "sexual":
      return "性別";
    case "homeAddress":
      return "家裡住址";
    case "email":
      return "電子信箱";
    case "phone":
      return "手機號碼";
    case "homeTel":
      return "家裡電話";
    case "emergencyContact":
      return "緊急聯絡人"
    case "emergencyContactNumber":
      return "緊急聯絡人電話";
    case "studentID":
      return "學號";
    case "grade":
      return "年級(請輸入整數數字)";
    case "teacher":
      return "導師";
    case "jobTitle":
      return "職稱";
    case "officeTel":
      return "辦公室電話";
    case "officeAddress":
      return "辦公室地址";
    default:
      return "";
  }
};

const getPattern = (key) => {
  switch (key) {
    case "phone":
    case "grade":
      return "\\d*"; // 數字
    default:
      return null;
  }
};

const updateProfile = async () => {
  try {
    const response = await fetch("/api/update-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user.value),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const data = await response.json();

    console.log("Profile updated successfully:", data);

    ElMessage({
      message: "修改成功",
      type: "success",
    });

    router.push("/profile"); // 更新完成后跳转回个人资料页面
  } catch (error) {
    console.error("Error updating profile:", error);
    ElMessage({
      message: "修改失敗",
      type: "error",
    });
  }
};
</script>

<style scoped>
.edit-profile-container {
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

input {
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
</style>

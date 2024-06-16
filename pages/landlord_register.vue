<template>
  <div class="register-container">
    <h1>Landlord Register</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <input
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="Email"
          class="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md"
        />
      </div>
      <div class="form-group">
        <input
          id="name"
          v-model="name"
          type="text"
          required
          placeholder="Name"
          class="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md"
        />
      </div>
      <div class="form-group">
        <input
          id="phone"
          v-model="phone"
          type="tel"
          required
          placeholder="Phone"
          class="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md"
          :pattern="`\\d*`"
        />
      </div>
      <button type="submit">註冊</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";

const email = ref("");
const name = ref("");
const phone = ref("");
const router = useRouter();

const user = useState("user");
// watch監聽user的變化 把email,name,phone的值設定為user的值
watch(
  () => user.value,
  (newUser) => {
    if (newUser) {
      email.value = newUser.email;
      name.value = newUser.name;
      phone.value = newUser.phone;
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (user.value.role === "LANDLORD") {
    router.push("/"); // 如果已經是房東，重定向到首頁
  }
});

const register = async () => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        name: name.value,
        phone: phone.value,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      ElMessage({
        message: "註冊成功",
        type: "success",
      });
      // 更新用户的本地状态
      user.value = {
        ...user.value,
        exists: true,
        role: data.role,
        phone: data.phone,
        id: data.id,
        sexual: data.sexual,
      };
      router.push("/");
    } else {
      const error = await response.json();
      ElMessage({
        message: error.message,
        type: "error",
      });
    }
  } catch (error) {
    ElMessage({
      message: "註冊失敗",
      type: "error",
    });
  }
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
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

.form-group {
  margin-bottom: 1rem;
}

button {
  display: block;
  width: 100%;
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>

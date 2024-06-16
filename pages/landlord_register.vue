<template>
  <div class="register-container mx-auto p-6 bg-white shadow-md rounded-lg">
    <h1 class="text-2xl font-bold text-center mb-6">Landlord Register</h1>
    <form class="space-y-4" @submit.prevent="register">
      <div class="form-group">
        <input
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="Email"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div class="form-group">
        <input
          id="name"
          v-model="name"
          type="text"
          required
          placeholder="Name"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div class="form-group">
        <input
          id="phone"
          v-model="phone"
          type="tel"
          required
          placeholder="Phone"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          :pattern="`\\d*`"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        註冊
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
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

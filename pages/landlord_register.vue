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
          readonly
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
          readonly
        />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const name = ref("");
const router = useRouter();

const user = useState("user");
email.value = user.value.email;
name.value = user.value.name;

const register = async () => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value, name: name.value }),
    });

    if (response.ok) {
      // 假設 ElMessage 是某個訊息提示組件
      ElMessage({
        message: "註冊成功",
        type: "success",
      });
      // 把role加入user的資料中
      user.value.role = "LANDLORD";
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

<template>
  <div class="flex flex-col items-center justify-center px-4 py-6">
    <div class="flex w-full max-w-md flex-col items-center justify-center">
      <!-- ---------------------------------------------Login 表單--------------------------------------------- -->
      <div class="login-container">
        <h1>Login</h1>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              placeholder="Enter your email"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit">Login</button>
          <div class="form-footer">
            <button class="link-button" @click.prevent="handleForgotPassword">
              Forgot Password?
            </button>
            <button class="link-button" @click.prevent="handleRegister">
              Register
            </button>
          </div>
        </form>
        <!----------------------------------------------- Login 表單--------------------------------------------- -->
      </div>
      <ClientOnly>
        <GoogleLogin :callback="callback" prompt />
      </ClientOnly>
      <AlertDialog v-if="showAlert">
        <AlertDialogTrigger>
          <button ref="alertTrigger" class="hidden">Show Dialog</button>
        </AlertDialogTrigger>
        <AlertDialogContent
          class="flex flex-col items-center justify-center w-1/5 max-w-xs p-4 bg-white rounded-lg shadow-lg"
        >
          <AlertDialogTitle class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-emerald-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span class="ml-2">登入成功</span>
          </AlertDialogTitle>
          <AlertDialogAction class="mt-4" @click="handleConfirm"
            >確認</AlertDialogAction
          >
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const showAlert = ref(false);
const alertTrigger = ref(null);
const router = useRouter();

const callback = async (response) => {
  if (!response?.credential) {
    // 登录失败
    return;
  }

  try {
    const { data } = await useFetch("/api/auth/google-credential", {
      method: "POST",
      body: {
        credential: response.credential,
      },
    });

    const user = useState("user"); // 共享状态
    if (data.value.exists) {
      // 用户存在，存储Google的头像和数据库中的用户信息
      user.value = { ...data.value.user, avatar: data.value.avatar };
      // 显示提示框
      showAlert.value = true;
    } else {
      // 用户不存在，重定向到 landlord_register 页面
      router.push("/landlord_register");
    }
  } catch (error) {
    console.error("Error in callback:", error);
  }
};
// 監聽 showAlert 的變化，自動觸發 AlertDialogTrigger
watch(showAlert, async (newVal) => {
  if (newVal) {
    await nextTick(); // 等待元素渲染完成
    console.log(alertTrigger.value);
    if (alertTrigger.value) {
      alertTrigger.value.click();
    }
  }
});

// 確認提示框
const handleConfirm = () => {
  showAlert.value = false;
  router.push("/");
};

definePageMeta({
  layout: false,
});
</script>

<style scoped>
.login-container {
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

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
}

button:hover {
  background-color: #409eff;
}

.form-footer {
  display: flex;
  justify-content: space-between;
}

.link-button {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
}
</style>

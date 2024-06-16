<template>
  <div class="login-container mx-auto p-6 bg-white shadow-md rounded-lg">
    <div class="flex flex-col items-center justify-center px-4 py-6">
      <div class="flex w-full max-w-md flex-col items-center justify-center">
        <!-- Google登入按鈕 -->
        <ClientOnly>
          <GoogleLogin :callback="callback" prompt />
        </ClientOnly>
        <p class="mt-4 text-2xl font-bold">
          <span class="text-google-blue">G</span>
          <span class="text-google-red">o</span>
          <span class="text-google-yellow">o</span>
          <span class="text-google-blue">g</span>
          <span class="text-google-green">l</span>
          <span class="text-google-red">e</span>
          <span class="text-gray-600">帳戶</span>
        </p>
        <!-- 條件渲染的提示框 -->
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
  </div>
</template>

<script setup>
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
      user.value = {
        ...data.value,
      };
      // 显示提示框
      showAlert.value = true;
    } else {
      user.value = {
        ...data.value,
      };
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
</script>

<!-- ______________________________________樣式____________________________________________ -->
<style scoped>
.login-container {
  max-width: 400px;
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

.text-google-blue {
  color: #4285f4;
}

.text-google-red {
  color: #db4437;
}

.text-google-yellow {
  color: #f4b400;
}

.text-google-green {
  color: #0f9d58;
}
</style>

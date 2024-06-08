<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const user = useState("user");
const isLoading = useState("isLoading");
const showAlert = ref(false);
const alertTrigger = ref(null);
const router = useRouter();

const goToProfile = () => {
  navigateTo("/profile");
};

const logout = async () => {
  await fetch("/api/auth/google-logout");
  user.value = null; // 登出後清空 user
  showAlert.value = true; // 顯示登出成功提示框
};

// 監聽 showAlert 的變化，自動觸發 AlertDialogTrigger
watch(showAlert, async (newVal) => {
  if (newVal) {
    await nextTick(); // 等待元素渲染完成
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

<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0">
      <NuxtLink to="/">
        <div class="title-text">高雄大學學生校外住宿管理系統</div>
      </NuxtLink>
    </el-menu-item>
    <div class="flex-grow" />
    <div class="title-login">
      <!-- 登入才顯示頭像 -->
      <template v-if="isLoading">
        <LoadingSpinner />
      </template>
      <template v-else>
        <template v-if="user">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div class="mr-2">
                <Avatar>
                  <AvatarImage :src="user.picture" alt="User avatar" />
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="goToProfile">Profile</DropdownMenuItem>
              <DropdownMenuItem @click="logout">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="login-link">
            <el-button size="large" type="primary" class="login-btn">
              Login
            </el-button>
          </NuxtLink>
        </template>
      </template>
    </div>
  </el-menu>

  <!-- 登出成功提示框 -->
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
        <span class="ml-2">登出成功</span>
      </AlertDialogTitle>
      <AlertDialogAction class="mt-4 logout-button" @click="handleConfirm"
        >確認</AlertDialogAction
      >
    </AlertDialogContent>
  </AlertDialog>
</template>

<style scoped>
.title-main {
  flex: 1;
}
.title-text {
  font-size: 25px;
  font-weight: bold;
  color: #409eff;
}

.title-login {
  display: inline-flex;
  align-items: center;
}

.login-link {
  padding: 20px;
  padding-right: 20px;
}

.login-btn {
  font-size: 23px;
}

.logout-button {
  background-color: #007bff;
}
</style>

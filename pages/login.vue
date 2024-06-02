<template>
  <div class="flex flex-col items-center justify-center px-4 py-6">
    <div class="flex w-full max-w-md flex-col items-center justify-center">
      <h1
        class="my-8 flex text-center text-3xl font-bold tracking-tight text-emerald-500"
      >
        Login
      </h1>
      <ClientOnly>
        <GoogleLogin :callback="callback" prompt />
      </ClientOnly>
      <AlertDialog v-if="showAlert">
        <AlertDialogTrigger as-child>
          <button ref="alertTrigger" class="hidden">Show Dialog</button>
        </AlertDialogTrigger>
        <AlertDialogContent>
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
          <AlertDialogAction @click="handleConfirm">確認</AlertDialogAction>
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
import { useFetch, useState } from "#imports";

const showAlert = ref(false);
const alertTrigger = ref(null);
const router = useRouter();

const callback = async (response) => {
  if (!response?.credential) {
    // 登入失敗
    return;
  }

  const { data } = await useFetch("/api/auth/google-credential", {
    method: "POST",
    body: {
      credential: response.credential,
    },
  });

  const user = useState("user"); // 共享狀態
  user.value = data.value;

  // 登入成功後顯示提示框
  if (user.value) {
    showAlert.value = true;
  }
};

// 監聽 showAlert 的變化，自動觸發 AlertDialogTrigger
watch(showAlert, async (newVal) => {
  if (newVal) {
    await nextTick();
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

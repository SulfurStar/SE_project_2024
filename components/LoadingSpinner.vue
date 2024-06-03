<!-- 加載轉圈圈 -->
<template>
  <div class="flex items-center justify-center">
    <div
      class="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-6 w-6"
    ></div>
  </div>
</template>

<script setup></script>

<style scoped>
.loader {
  border-top-color: #3498db;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

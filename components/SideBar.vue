<template>
  <div class="sidebar">
    <div class="toggle-btn-container">
      <!-- 切換側邊欄展開/收起狀態的按鈕 -->
      <el-button v-if="isCollapse" class="toggle-btn" @click="toggleSidebar">
        <el-icon><Expand /></el-icon>
      </el-button>
      <el-button v-else class="toggle-btn" @click="toggleSidebar">
        <el-icon><Fold /></el-icon>
      </el-button>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo h-full"
      :collapse="isCollapse"
    >
      <!-- 菜單項目 -->
      <el-menu-item index="1">
        <el-icon @click="navigateTo('/advertisement')"><MapLocation /></el-icon>
        <template #title>
          <NuxtLink to="/advertisement" class="menu-link">租屋廣告</NuxtLink>
        </template>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon @click="navigateTo('/posts')"><ChatLineRound /></el-icon>
        <template #title>
          <NuxtLink to="/post" class="menu-link">貼文區</NuxtLink>
        </template>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon @click="navigateTo('/visitation')"><Document /></el-icon>
        <template #title>
          <NuxtLink to="/visitation" class="menu-link">訪視</NuxtLink>
        </template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon @click="navigateTo('/about')"><More /></el-icon>
        <template #title>
          <NuxtLink to="/about" class="menu-link">關於</NuxtLink>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import { Document, Expand, Fold } from "@element-plus/icons-vue";

// 定義組件的 props
const props = defineProps({
  isExpanded: {
    type: Boolean,
    required: true,
  },
});

// 定義組件的 emits
const emit = defineEmits(["toggleSidebar"]);

// 控制側邊欄是否收起
const isCollapse = ref(props.isExpanded);

// 監聽 props 的變化，更新 isCollapse 的值
watch(
  () => props.isExpanded,
  (newVal) => {
    isCollapse.value = !newVal;
  }
);

// 切換側邊欄展開/收起狀態
const toggleSidebar = () => {
  emit("toggleSidebar");
};
</script>

<style scoped>
.sidebar {
  height: 100%;
  transition: width 0.3s;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.toggle-btn-container {
  display: flex;
  justify-content: flex-end; /* 將按鈕置於右側 */
  align-items: center;
  margin-bottom: 20px;
}

.toggle-btn {
  width: 64px; /* 與 el-menu-item 的高度一致 */
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
}

.toggle-btn:hover {
  background-color: #f5f7fa;
}

.menu-link {
  display: inline-block;
  transition:
    width 0.3s,
    opacity 0.3s; /* 添加過渡效果 */
  white-space: nowrap; /* 防止文字換行 */
  overflow: hidden; /* 隱藏超出部分 */
  text-overflow: ellipsis; /* 添加省略號 */
}
/* 當側邊欄收起時，隱藏菜單文字 */
.el-menu--collapse .menu-link {
  width: 0;
  opacity: 0;
  transition:
    width 0.2s,
    opacity 0.1s; /* 加快過渡效果 */
}
/* 當側邊欄展開時，顯示菜單文字 */
.el-menu:not(.el-menu--collapse) .menu-link {
  width: auto;
  opacity: 1;
  transition:
    width 0.3s,
    opacity 0.5s; /* 添加過渡效果 */
}
</style>

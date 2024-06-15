<template>
  <div class="sidebar">
    <div class="toggle-btn-container">
      <!-- 切換側邊欄展開/收起狀態的按鈕 -->
      <el-button v-if="isCollapse" class="toggle-btn" @click="toggleSidebar">
        <el-icon class="hover:text-blue-500"><Expand /></el-icon>
      </el-button>
      <el-button v-else class="toggle-btn" @click="toggleSidebar">
        <el-icon class="hover:text-blue-500"><Fold /></el-icon>
      </el-button>
    </div>
    <el-menu class="el-menu-vertical-demo h-full" :collapse="isCollapse">
      <!-- 菜單項目 -->

      <el-sub-menu
        index="1"
        class="hover-item"
        @click="navigateTo('/advertisement')"
      >
        <template #title>
          <el-icon><MapLocation /></el-icon>
          <NuxtLink to="/advertisement" class="menu-link">廣告總覽</NuxtLink>
        </template>
        <!-- 以下為子菜單 -->
        <el-menu-item index="1-1" @click="navigateTo('/Ad')"
          >廣告總覽</el-menu-item
        >

        <!-- 以下@click 後的路徑可能須做更動 -->
        <!-- 佈告欄審核(總)Bd_verify 管理員限定頁面 -->
        <el-menu-item
          v-if="user && user.role === 'ADMIN'"
          index="1-2"
          @click="navigteTo('/Ad')"
          >佈告欄審核
        </el-menu-item>

        <!-- 廣告審核(總)Ad_verify 管理員限定頁面 -->
        <el-menu-item
          v-if="user && user.role === 'ADMIN'"
          index="1-3"
          @click="navigateTo('/Ad')"
          >廣告審核
        </el-menu-item>

        <!-- 廣告新增Ad_new 房東限定頁面 -->
        <el-menu-item
          v-if="user && user.role === 'LANDLORD'"
          index="1-4"
          @click="navigateTo('/Ad')"
          >新增廣告
        </el-menu-item>

        <!-- 廣告管理Ad_manage 房東限定頁面 -->
        <el-menu-item
          v-if="user && user.role === 'LANDLORD'"
          index="1-5"
          @click="navigateTo('/Ad')"
          >我的廣告
        </el-menu-item>

        <!-- 佈告欄新增Bd_new 老師限定頁面 -->
        <el-menu-item
          v-if="user && user.role === 'TEACHER'"
          index="1-6"
          @click="navigateTo('/Ad')"
          >新增佈告欄
        </el-menu-item>

        <!-- 佈告欄管理Bd_manage 老師限定頁面 -->
        <el-menu-item
          v-if="user && user.role === 'TEACHER'"
          index="1-7"
          @click="navigateTo('/Ad')"
          >我的佈告欄
        </el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="2" class="hover-item">
        <template #title>
          <el-icon><ChatLineRound /></el-icon>
          <NuxtLink to="/posts" class="menu-link">貼文區</NuxtLink>
        </template>
        <!-- 以下為子菜單 -->
        <el-menu-item index="1-1" @click="navigateTo('/posts')"
          >貼文總覽</el-menu-item
        >

        <el-menu-item
          v-if="
            user &&
            (user.role === 'STUDENT' || 'ADMIN' || 'LANDLORD' || 'TEACHER')
          "
          index="1-2"
          @click="navigateTo('/posts/new-post')"
          >新增貼文
        </el-menu-item>

        <el-menu-item
          v-if="
            user &&
            (user.role === 'STUDENT' || 'ADMIN' || 'LANDLORD' || 'TEACHER')
          "
          index="1-3"
          @click="navigateTo('/my/posts/1')"
          >我的貼文
        </el-menu-item>
        <el-menu-item
          v-if="user && user.role === 'ADMIN'"
          index="1-4"
          @click="navigateTo('/posts/management/1')"
          >管理貼文
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item
        index="3"
        class="hover-item"
        @click="navigateTo('/visitation')"
      >
        <el-icon><Phone /></el-icon>
        <NuxtLink to="/visitation" class="menu-link">訪視</NuxtLink>
      </el-menu-item>
      <el-menu-item index="4" class="hover-item" @click="navigateTo('/about')">
        <el-icon><More /></el-icon>
        <NuxtLink to="/about" class="menu-link">關於</NuxtLink>
      </el-menu-item>
      <el-menu-item
        v-if="user && user.role === 'ADMIN'"
        index="5"
        class="hover-item"
        @click="navigateTo('/create_account')"
      >
        <el-icon><DocumentAdd /></el-icon>
        <NuxtLink to="/create_account" class="menu-link">創建帳號</NuxtLink>
      </el-menu-item>
      <el-menu-item
        v-if="user && user.role === 'ADMIN'"
        index="6"
        class="hover-item"
        @click="navigateTo('/delete_account')"
      >
        <el-icon><DeleteIcon /></el-icon>
        <NuxtLink to="/delete_account" class="menu-link">刪除帳號</NuxtLink>
      </el-menu-item>
      <el-menu-item
        v-if="user && user.role === 'ADMIN'"
        index="7"
        class="hover-item"
        @click="navigateTo('/admin_edit_user')"
      >
        <el-icon><PenBoxIcon /></el-icon>
        <NuxtLink to="/admin_edit_user" class="menu-link"
          >修改使用者資料</NuxtLink
        >
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { DeleteIcon, PenBoxIcon } from "lucide-vue-next";

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
const isCollapse = computed(() => props.isExpanded);

// 切換側邊欄展開/收起狀態
const toggleSidebar = () => {
  emit("toggleSidebar");
};
const user = useState("user");
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
  justify-content: flex-start; /* 將按鈕置於左側 */
  align-items: center;
  margin-bottom: 3px;
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

/* 只在鼠標滑過時變色 */
.el-icon:hover {
  color: #3b82f6; /* Tailwind CSS 的 blue-500 顏色 */
}

/* 當側邊欄收起時，hover選項會出現文字框 */
.el-menu--collapse .hover-item:hover .menu-link {
  width: auto;
  opacity: 1;
  background-color: #ffffff;
  color: #000000;
  padding: 5px 10px; /* 調整內邊距以減少高度 */
  margin: 0 40px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  position: absolute;
  z-index: 1000; /* 使文字框顯示在最上層 */
  line-height: 2; /* 調整行高以使文字垂直居中 */
}
</style>

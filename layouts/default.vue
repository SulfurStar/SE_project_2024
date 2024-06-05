<template>
  <div :class="['layout', { 'sidebar-expanded': isSidebarExpanded }]">
    <SideBar :is-expanded="isSidebarExpanded" @toggle-sidebar="toggleSidebar" />
    <div class="main-content">
      <header :class="{ 'header-expanded': isSidebarExpanded }">
        <nav>
          <div class="title-main">
            <NuxtLink to="/" class="title-homepage"
              >高雄大學學生校外住宿管理系統</NuxtLink
            >
          </div>
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
                    <DropdownMenuItem @click="goToProfile"
                      >Profile</DropdownMenuItem
                    >
                    <DropdownMenuItem @click="logout">Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </template>
              <template v-else>
                <NuxtLink to="/login" class="login-btn btn">Login</NuxtLink>
              </template>
            </template>
          </div>
        </nav>
      </header>
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import SideBar from "@/components/SideBar.vue";

const user = useState("user");
const isLoading = useState("isLoading");
const isSidebarExpanded = ref(true);

const toggleSidebar = () => {
  isSidebarExpanded.value = !isSidebarExpanded.value;
};

const goToProfile = () => {
  navigateTo("/profile");
};

const logout = async () => {
  await fetch("/api/auth/google-logout");
  user.value = null; // 登出後清空 user
  await navigateTo("/");
};
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.layout.sidebar-expanded .main-content {
  width: 100%; /* 側邊欄展開時，main-content 的寬度 */
}

.layout .main-content {
  width: 100%;
  transition:
    width 0.3s,
    margin-left 0.3s; /* 添加過渡效果 */
}

.header-expanded {
  width: 100%; /* 側邊欄展開時，header 的寬度 */
  transition:
    width 0.3s,
    margin-left 0.3s; /* 添加過渡效果 */
}

nav a {
  margin: 0 10px;
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title-main {
  flex: 1;
}

.title-login {
  display: inline-flex;
  align-items: center;
}

header {
  width: 100%;
  background-color: #000000;
  color: white;
  padding: 10px 0;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  transition:
    width 0.3s,
    margin-left 0.3s; /* 添加過渡效果 */
}

.title-homepage {
  font-size: 2.5em;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  background-color: #1f2937;
  color: white;
  text-decoration: none;
}

.btn:hover {
  background-color: #374151;
}

.btn:focus {
  outline: none;
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, 0.5),
    0 0 0 4px #6b7280;
}

.link-btn {
  font-size: 1.5em;
  float: right;
  margin-right: 20px;
}

.login-btn {
  font-size: 1.5em;
  float: right;
  margin-right: 20px;
  background-color: #ffffff;
  color: black;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .layout {
    flex-direction: column;
  }

  .main-content {
    margin-left: 0;
    width: 100%;
  }

  .header-expanded {
    margin-left: 0;
    width: 100%;
  }

  .title-main {
    font-size: 1.5em;
  }

  .title-login {
    font-size: 1em;
  }

  .btn,
  .login-btn {
    font-size: 1em;
    padding: 0.25rem 0.5rem;
  }
}
</style>

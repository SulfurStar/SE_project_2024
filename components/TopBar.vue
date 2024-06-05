<script setup>
  import LoadingSpinner from "@/components/LoadingSpinner.vue";

  const user = useState("user");
  const isLoading = useState("isLoading");

  const goToProfile = () => {
    navigateTo("/profile");
  };

  const logout = async () => {
    await fetch("/api/auth/google-logout");
    user.value = null; // 登出後清空 user
    await navigateTo("/");
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
        <div class="title-text">高雄大學學生校外住宿管理系統 </div> 
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
    <!-- <el-menu-item index="1">Processing Center</el-menu-item>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu> -->
  </el-menu>
</template>

<style scoped>

.title-main {
  flex: 1;
}
.title-text{
  font-size: 25px;
  font-weight: bold;
  color: #409EFF;
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

/* 響應式設計 */
</style>

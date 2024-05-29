<template>
    <div>
      <button @click="createUser">Create User</button>
      <!-- 其他內容 -->
      <HelloWorld />
      <el-button>button</el-button>
    </div>
  </template>
  
  <script>

  onMounted(() => {
    console.log("Component mounted");
    setPageLayout();
  });
  export default {
    methods: {
      async createUser() {
        try {
          const response = await fetch('/api/test-create-user');
          const data = await response.json();
          console.log("User created:", data);
          // 可以根據需要處理返回的數據
        } catch (error) {
          console.error("Error creating user:", error);
        }
      }
    }
  }
  </script>
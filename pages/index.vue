<template>
    <div>
      <button @click="createUser">Create User</button>
      <button @click="createPhoto">Upload testPhoto</button>
      <button @click="getPhoto">get testPhoto</button>
      <!-- 其他內容 -->
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      async createUser() {
        try {
          const response = await fetch('/api/test-create-user.get');
          const data = await response.json();
          console.log("User created:", data);
          // 可以根據需要處理返回的數據
        } catch (error) {
          console.error("Error creating user:", error);
        }
      },
      async createPhoto() {
        try {
          const response = await fetch('/api/test-upload-image');
          const data = await response.json();
          console.log("testPhoto created:", data);
          // 可以根據需要處理返回的數據
        } catch (error) {
          console.error("Error creating testPhoto:", error);
        }
      },
      async getPhoto() {
        try {
          await fetch('/api/test-get-image');
          console.log("got testPhoto:");
          // 可以根據需要處理返回的數據
        } catch (error) {
          console.error("Error creating testPhoto:", error);
        }
      }
    }
  }
  </script>
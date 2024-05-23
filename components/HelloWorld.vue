<template>
  <div>
    <!-- 按鈕，點擊時觸發 showMessage 函數 -->
    <button @click="showMessage">Click Me</button>
    <!-- 顯示訊息 -->
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '' // 定義一個 message 屬性
    };
  },
  methods: {
    showMessage() {
      this.message = 'Hello, you clicked the button!'; // 更新 message 的值
    }
  }
};
</script>

<style scoped>
/* 這裡可以寫組件的樣式 */
button {
  margin: 10px;
  padding: 10px;
  font-size: 16px;
}
p {
  font-size: 18px;
  color: #333;
}
</style>

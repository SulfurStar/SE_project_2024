<template>
    <div class="container">
      <h1 class="bulletin-title">房東廣告管理</h1>
    
      <!-- 第一個廣告 -->
      <div class="bulletin-item">
        <input name="通過" type="text" value="通過" class="bulletin-input"/>
      </div>
    
      <hr class="bulletin-divider"/>
      
    
      <!-- 第二個廣告 -->
      <div class="bulletin-item">
        <textarea name="廣告" class="bulletin-textarea">廣告</textarea>
        <div class="button-group">
          <button class="bulletin-button">修改</button>
          <button class="bulletin-button">刪除</button>
        </div>
      </div>
    
      <!-- 第三個廣告 -->
      <div class="bulletin-item">
        <textarea class="bulletin-textarea">廣告</textarea>
        <div class="button-group">
          <button class="bulletin-button">修改</button>
          <button class="bulletin-button">刪除</button>
        </div>
      </div>
    
      <!-- 第四個廣告 -->
      <div class="bulletin-item">
        <input name="未通過" type="text" value="未通過" class="bulletin-input"/>
      </div>
    
      <hr class="bulletin-divider"/>
    
      <!-- 第五個廣告 -->
      <div class="bulletin-item">
        <textarea name="廣告" class="bulletin-textarea">廣告</textarea>
        <div class="button-group">
          <button class="bulletin-button">修改</button>
          <button class="bulletin-button">刪除</button>
        </div>
      </div>
    
      <!-- 第六個佈告欄 -->
      <div class="bulletin-item">
        <textarea class="bulletin-textarea">廣告</textarea>
        <div class="button-group">
          <button class="bulletin-button">修改</button>
          <button class="bulletin-button">刪除</button>
        </div>
      </div>
    </div>
    </template>
    
    <script>
    export default {
    // 如果需要的話，您可以在這裡添加組件的邏輯
    }
    </script>
    
    <style scoped>
    /* 添加美化樣式 */
    .container {
    max-width: 600px;
    margin: 0 auto; /* 將容器置中 */
    }
    
    .bulletin-title {
    font-size: 26px;
    }
    
    .bulletin-item {
    margin-bottom: 20px;
    }
    
    .bulletin-input,
    .bulletin-textarea {
    font-size: 16px;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    }
    
    .button-group {
    text-align: center; /* 將按鈕置中 */
    }
    
    .bulletin-button {
    display: inline-block;
    padding: 10px 20px;
    margin-right: 10px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    }
    
    .bulletin-divider {
    margin-top: 20px;
    margin-bottom: 20px;
    }
    </style>
    
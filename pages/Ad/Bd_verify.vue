<template>
    <div class="container">
      <h1 class="bulletin-title">佈告欄審核</h1>
      
      <!-- 第一個佈告欄 -->
      <div class="bulletin-item">
        <input name="未審核" type="text" value="未審核" class="bulletin-input"/>
      </div>
      
      <hr class="bulletin-divider"/>
      
      <!-- 第二個佈告欄 -->
      <div class="bulletin-item">
        <textarea name="佈告欄" class="bulletin-textarea">佈告欄</textarea>
        <div class="button-group">
          <button class="bulletin-button">審核</button>
        </div>
      </div>
      
      <!-- 第三個佈告欄 -->
      <div class="bulletin-item">
        <textarea class="bulletin-textarea">佈告欄</textarea>
        <div class="button-group">
          <button class="bulletin-button">審核</button>
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
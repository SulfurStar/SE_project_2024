<template>
    <div>
      <form @submit.prevent="submitForm">
        <label for="title">標題：</label><br/>
        <textarea v-model="title" id="title" name="title" rows="3" cols="50"></textarea><br/>
    
        <label for="content">內文：</label><br/>
        <textarea v-model="content" id="content" name="content" rows="10" cols="50"></textarea><br/>
    
        <button type="button">新增</button>
        
      </form>
    </div>
    </template>
    
    <script>
    export default {
    data() {
      return {
        title: '',
        content: ''
      };
    },
    methods: {
      submitForm() {
        // 在此處添加提交表單的代碼
        console.log('Title:', this.title);
        console.log('Content:', this.content);
      }
    }
    }
    </script>
    <style>
    /* 在您的 CSS 文件中添加以下樣式 */
    form {
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #f9f9f9;
    }
    
    label {
      font-weight: bold;
    }
    
    textarea {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    
    button {
      padding: 10px 20px;
      margin-right: 10px; /* 調整按鈕之間的右邊距 */
      border: none;
      border-radius: 5px;
      background-color: #007bff;
      color: #fff;
      cursor: pointer;
    }
    
    button[type="reset"] {
      background-color: #dc3545;
      margin-right: 0; /* 讓重置按鈕不再使用右邊距 */
    }
    
    </style>
    
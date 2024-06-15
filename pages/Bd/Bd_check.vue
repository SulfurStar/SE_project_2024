<template>
    <div class="container">
      <h2>審核佈告欄頁面</h2>
      <form @submit.prevent="submitForm">
        <label for="title">標題：</label><br/>
        <input id="title" v-model="formData.title" type="text" readonly><br/>
    
        <label for="content">內文：</label><br/>
        <textarea id="content" v-model="formData.content" rows="10" cols="50" readonly></textarea><br/>
    
        <button type="submit">通過</button>
        <button type="reset">不通過</button><br/>
      </form>
    </div>
    </template>
    
    <script>
    export default {
      data() {
        return {
          formData: {
            title: '',
            content: ''
          }
        };
      },
      methods: {
        submitForm() {
          // Handle form submission logic here
          console.log('Form submitted with data:', this.formData);
        }
      }
    }
    </script>
    
    <style scoped>
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #f9f9f9;
    }
    
    input, textarea {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #fff;
    }
    
    textarea {
      resize: vertical; /* Allow vertical resizing */
    }
    
    button {
      padding: 10px 20px;
      margin-right: 10px;
      border: none;
      border-radius: 5px;
      color: #fff;
      cursor: pointer;
    }
    
    button[type="submit"] {
      background-color: #5cb85c;
    }
    
    button[type="reset"] {
      background-color: #d9534f;
    }
    </style>
    
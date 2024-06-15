<template>
    <div class="container">
      <h2>佈告欄頁面</h2>
      <form @submit.prevent="submitForm">
        <label for="title">標題：</label><br/>
        <input id="title" v-model="formData.title" type="text" readonly> {{Bd.title}} <br/>
    
        <label for="content">內文：</label><br/>
        <textarea id="content" v-model="formData.content" rows="10" cols="50" readonly> {{Bd.content}} </textarea><br/>
    
      </form>
    </div>
    </template>
    
    <script>

    import { useRoute } from "vue-router";
    import { ref, onMounted } from "vue";
    //import Advertise from "../Advertise.vue";  //*
    import { User } from "lucide-vue-next";

    export default {
      setup() {

        const route = useRoute();
        const Bd = ref(null); // 這裡的 Bd 用來存放從 API 取得的廣告資料 

        // 呼叫 API 時所需的參數 
        const params = { 
          BdId: route.params.id, // 這裡的 id 是從路由參數取得的
        };

        onMounted(async () => { // 在元件掛載後執行
          const response = await fetch(`/api/bd/get-single-bd`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(params), // 將參數轉成 JSON 字串
          });
          Bd.value = await response.json(); // 將取得的資料存入 Ad 變數中

        });
        // console.log("AD",Ad);
        return { Bd }; // 回傳 Ad 變數
      }
    };

    //export default {
      //data() {
        //return {
          //formData: {
            //title: '',
            //content: ''
          //}
        //};
      //},
      //methods: {
        //submitForm() {
          // //Handle form submission logic here
          //console.log('Form submitted with data:', this.formData);
        //}
      //}
    //}
    </script>
    
    <style scoped>
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
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
    
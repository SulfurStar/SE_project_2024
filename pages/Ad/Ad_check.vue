<template>
    <div class="container">
      <h2>管理員審核廣告頁面(新增/修改)</h2>
      <form>
         廣告標題 : <br>
         電話 : <br>
         出租房數 : <br>
         可預約看房 : <br>
         房屋類型 : <br>
         出租類型 : <br>
         最低租金 : <br>
         最高租金 : <br>
         押金 : <br>
         其他費用 : <br>
         建物樓層 : <br>
         獨立電表 : <br>
         隔間材質 : <br>
         性別要求: <br>
         無菸租屋 : <br>
         身份要求 : <br>
         有電視 : <br>
         有冰箱 :<br>
         有洗衣機 : <br>
         有烘衣機 : <br>
         有飲水機 : <br>
         有衣櫃 : <br>
         有單人床 : <br>
         有雙人床 : <br>
         有書桌 : <br>
         有寬頻網路 : <br>
         公共設備 : <br>
         屋況說明 : <br>
         熱水器 : <br>
         安全設施 : <br>
         證明文件 : <br>
         屋齡 : <br>
         下架時間 : <br>
      </form>
    
      <input type="file" @change="uploadImage" class="upload-button">
      <p></p>
      <button name="button" class="approve-button" @click="approve">通過</button> 
      <button name="button" class="reject-button" @click="reject">不通過</button>
    </div>
    <div class="toast-container position-fixed top-85 top-md-10 start-50 translate-middle" style="z-index:3000">
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true"
        v-for="(msg,i) in messages" :key="i">
        <div class="toast-header">
            <span :class="`bg-${msg.style}`" class="p-2 rounded me-2 d-inline-block"></span>
            <strong class="me-auto">{{msg.title}}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"
            @click="clearToast(i)"></button>
        </div>
        <div class="toast-body d-flex flex-column align-items-center text-dark" >
            <i class="fa-solid fa-2x mb-3" :class="`${msg.icon} text-${msg.style}`"></i>
            {{msg.content}}
        </div>
    </div>
    </div>
    </template>
    
    
    //<script>
    //export default {
      //methods: {
        //uploadImage(event) {
         // const file = event.target.files[0];
          // Handle file upload logic here
          //console.log('Uploading image:', file);
       // },
        //approve() {
          // Handle approve logic here
        //  console.log('Approve clicked');
          // Redirect to "approved" page
         // this.$router.push('/approved');
       // },
       // reject() {
          // Handle reject logic here
         // console.log('Reject clicked');
          // Redirect to "rejected" page
         // this.$router.push('/rejected');
      //  }
      //}
    //}
    //</script>
    
    <style scoped>
    .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    }
    
    .upload-button {
    margin-bottom: 20px;
    }
    
    .approve-button, .reject-button {
    padding: 10px 20px;
    margin-right: 10px;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    }
    
    .approve-button {
    background-color: #5cb85c;
    }
    
    .reject-button {
    background-color: #d9534f;
    }
    </style>
    
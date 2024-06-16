<template>
    <el-card class="post-card">
      <div class="post-header">
        <h2 class="post-title">{{ Ad.title }}</h2>
        <!-- <p class="post-author">by {{ post.authorId }}</p> -->
        <!-- <p class="post-status">Status: {{ post.status }}</p> -->
      </div>
      <!-- <div class="post-body">
              <p class="post-content">{{ post.content }}</p>
              <img v-if="post.imageUrl" :src="post.imageUrl" alt="Post Image" class="post-image">
              </div> -->
      <div class="post-footer">
        <!-- <el-icon :size="20" color="" class="report-icon"
          ><WarningFilled
        /></el-icon> -->
        <div class="post-date">
          Posted on: {{ new Date(Ad.createdAt).toLocaleDateString() }} <!--*-->
        </div>
      </div>
    </el-card>
  </template>
  
  <script>
  export default {
    name: "AdTitleCard", //*
    props: {
      Ad: {  //*
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .post-card {
    margin-bottom: 20px;
  }
  .post-header,
  .post-footer {
    padding: 16px;
    background-color: #f9f9f9;
  }
  .post-header {
    border-bottom: 1px solid #eaeaea;
  }
  .post-title {
    margin: 0;
    font-size: 1.5em;
    color: #333;
  }
  .post-author,
  .post-status {
    margin: 4px 0;
    font-size: 0.9em;
    color: #20e086;
  }
  .post-body {
    padding: 16px;
  }
  .post-content {
    margin: 0 0 16px;
    color: #333;
  }
  .post-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  .post-footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    text-align: right;
    font-size: 0.8em;
    color: #999;
  }
  </style>
  
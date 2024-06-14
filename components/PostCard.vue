<template>
    <el-card class="post-card">
        <div class="post-header">
            <h2 class="post-title">{{ post.title }}</h2>
            <p class="post-author">by {{ authorname }}</p>
            <!-- <p class="post-status">Status: {{ post.status }}</p> -->
        </div>
        <div class="post-body">
            <div class="post-content">{{ post.content }}</div>
            <img v-if="post.imageUrl" :src="post.imageUrl" alt="Post Image" class="post-image">
        </div>
        <div class="post-footer">
            <p class="post-date">Posted on: {{ new Date(post.createdAt).toLocaleDateString() }}</p>
        </div>
    </el-card>
</template>

<script>
// import auth from '~/middleware/auth';

export default {
  name: 'PostCard',
  props: {
    post: {
      type: Object,
      required: true
    },
    authorname: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.post-card {
    margin-bottom: 20px;
}
.post-header, .post-footer {
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
.post-author, .post-status {
    margin: 4px 0;
    font-size: 0.9em;
    color: #666;
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
    text-align: right;
    font-size: 0.8em;
    color: #999;
}
.post-content {
  max-width: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
  overflow: hidden;
}
</style>
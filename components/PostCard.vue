<template>
  <el-card class="post-card">
    <div class="post-header">
      <h2 class="post-title">{{ post.title }}</h2>
      <p class="post-author">by {{ authorname }}</p>
      <!-- <p class="post-status">Status: {{ post.status }}</p> -->
      <!-- <p v-if="post.reportedReason" class="post-reason">
        Reported Reason: {{ post.reportedReason }}
      </p> -->
    </div>
    <div class="post-body">
      <div class="post-content">{{ post.content }}</div>
      <div v-if="postWithImageUrls.imageUrls.length" class="post-images">
        <img
          v-for="(url, index) in postWithImageUrls.imageUrls"
          :key="index"
          :src="url"
          alt="Post Image"
          class="post-image"
        />
      </div>
    </div>
    <div class="post-footer">
      <div class="options">
        <el-icon
          v-if="post.authorId === userid"
          :size="20"
          color=""
          class="icon"
        >
          <NuxtLink :to="`/posts/${post.id}/edit`"><EditPen /></NuxtLink>
        </el-icon>
      </div>
      <p class="post-date">
        Posted on: {{ new Date(post.createdAt).toLocaleDateString() }}
      </p>
    </div>
  </el-card>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  authorname: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: false,
    default: null,
  },
});

// 將圖片URL字符串拆分成數組
const postWithImageUrls = computed(() => {
  return {
    ...props.post,
    imageUrls: props.post.imageUrl ? props.post.imageUrl.split(",") : [],
  };
});
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
.post-status,
.post-reason {
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
  margin-bottom: 8px;
}
.post-footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
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
.options .icon {
  margin-left: 8px;
}
</style>

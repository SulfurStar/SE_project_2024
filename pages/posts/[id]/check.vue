<template>
  <div v-if="post">
    <div class="content">
      <div class="PostCard">
        <!-- <NuxtLink :to="`/posts/${post.id}/edit`">Edit</NuxtLink> -->
        <PostCard :post="post" :authorname="authorName" />
        <div class="button-group">
          <el-button type="success" @click="approvePost">審核通過</el-button>
          <el-button type="danger" @click="rejectPost">審核失敗</el-button>
        </div>
      </div>
      <div class="comment">
        <div v-if="comments">
          <div v-for="comment in comments" :key="comment.id">
            <CommentCard :comment="comment" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import PostCard from "~/components/PostCard.vue";

const route = useRoute();
const post = ref(null);
const authorName = ref(null);
const comments = ref(null);

const params = {
  postId: route.params.id,
};

onMounted(async () => {
  const postId = route.params.id;
  const response = await fetch(`/api/posts/get-single-post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const data = await response.json();
  post.value = data.post;
  authorName.value = data.authorName;

  const responseComment = await fetch("/api/posts/get-comment-by-Id", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  comments.value = await responseComment.json();
});

const approvePost = async () => {
  try {
    const response = await fetch(`/api/posts/${params.postId}/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result.success) {
      ElMessage({
        message: "審核完畢",
        type: "success",
      });
      post.value.status = "APPROVED";
      navigateTo(`/posts/management/1`);
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    ElMessage({
      message: "審核錯誤",
      type: "error",
    });
  }
};

const rejectPost = async () => {
  try {
    const response = await fetch(`/api/posts/${params.postId}/reject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result.success) {
      ElMessage({
        message: "審核錯誤",
        type: "success",
      });
      post.value.status = "REJECTED";
      navigateTo(`/posts/management/1`);
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    ElMessage({
      message: "審核失敗",
      type: "error",
    });
  }
};
</script>
<style scoped>
.content {
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content .PostCard {
  width: 100%;
  max-width: 800px;
  padding: 20px;
}

.content .comment {
  width: 100%;
  max-width: 800px;
  padding: 20px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>

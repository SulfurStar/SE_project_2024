<template>
  <div v-if="post">
    <div class="content">
      <div class="PostCard">
        <!-- <NuxtLink :to="`/posts/${post.id}/edit`">Edit</NuxtLink> -->
        <el-button v-if="userId == authorId" type="error" @click="deletePost">刪除貼文</el-button>
        <el-button v-if="userId != authorId" type="error" @click="reportPost">檢舉貼文</el-button>
        <PostCard :post="post" :authorname="authorName" :userid="userId"/>
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
import { useRoute,useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import PostCard from "~/components/PostCard.vue";
const user = useState('user');
const userId = user.value.id;

const route = useRoute();
const router = useRouter();
const post = ref(null);
const authorName = ref(null);
const authorId = ref(null);
const comments = ref(null);

const params = {
  postId: route.params.id,
};

// function to delete post
const deletePost = async () => {
  const response = await fetch(`/api/posts/delete-post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const data = await response.json();
  if (data.success) {
    ElMessage.success("Post deleted successfully");
    router.push("/my/posts/1");
  } else {
    ElMessage.error("Failed to delete post");
  }
};

// function to ask for the resons to report post by alert with input
const reportPost = async () => {
  const { value: reason } = await ElMessageBox.prompt("請輸入檢舉原因", "檢舉貼文", {
    confirmButtonText: "檢舉",
    cancelButtonText: "取消",
  });
  if (reason) {
    const response = await fetch(`/api/posts/report-post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...params, reason }), // params: {postId: route.params.id, reason: reason}
    });
    const data = await response.json();
    if (data.success) {
      ElMessage.success("Post reported successfully");
    } else {
      ElMessage.error("Failed to report post");
    }
  }
};


// function to report post
// const reportPost = async () => {
//   const response = await fetch(`/api/posts/report-post`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(params),
//   });
//   const data = await response.json();
//   if (data.success) {
//     ElMessage.success("Post reported successfully");
//   } else {
//     ElMessage.error("Failed to report post");
//   }
// };

onMounted(async () => {

  const response = await fetch(`/api/posts/get-single-post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const data = await response.json();
  post.value = data.post;
  authorId.value = data.authorId;
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
</script>

<style>
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
</style>

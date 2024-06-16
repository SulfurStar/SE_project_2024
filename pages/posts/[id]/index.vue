<template>
  <div v-if="post">
    <div class="content">
      <div class="PostCard">
        <!-- <NuxtLink :to="`/posts/${post.id}/edit`">Edit</NuxtLink> -->
        <el-button v-if="userId == authorId" type="error" @click="deletePost"
          >刪除貼文</el-button
        >
        <el-button v-if="userId != authorId" type="error" @click="reportPost"
          >檢舉貼文</el-button
        >
        <PostCard :post="post" :authorname="authorName" :userid="userId" />
      </div>

      <div class="updateComment">
        <el-dialog
          v-model="dialogVisible2"
          title="修改留言"
          width="500"
          :before-close="handleClose"
        >
          <el-input
            v-model="textarea2"
            style="width: 100%; font-size: 16px"
            :autosize="{ minRows: 5, maxRows: 20 }"
            type="textarea"
            placeholder=""
          >
          </el-input>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="dialogVisible2 = false">取消</el-button>
              <el-button type="primary" @click="updateComment">
                確認
              </el-button>
            </div>
          </template>
        </el-dialog>
      </div>

      <div class="createComment">
        <el-button type="primary" @click="dialogVisible1 = true"
          >新增留言</el-button
        >
        <el-dialog
          v-model="dialogVisible1"
          title="新增留言"
          width="500"
          :before-close="handleClose"
        >
          <el-input
            v-model="textarea1"
            style="width: 100%; font-size: 16px"
            :autosize="{ minRows: 5, maxRows: 20 }"
            type="textarea"
            placeholder="公開留言..."
          >
          </el-input>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="dialogVisible1 = false">取消</el-button>
              <el-button type="primary" @click="addComment">
                確認
              </el-button>
            </div>
          </template>
        </el-dialog>
      </div>

      <div class="comment">
        <div v-if="comments">
          <div v-for="comment in comments" :key="comment.id">
            <div v-if="comment.status != 'REMOVED'">
              <el-button
                v-if="comment.authorId != userId"
                type="danger"
                @click="reportComment(comment.id)"
                >檢舉留言</el-button
              >
              <el-button
                v-if="comment.authorId == userId"
                type=""
                @click="updateCommentReq(comment)"
                >修改留言</el-button
              >
              <el-button
                v-if="comment.authorId == userId"
                type=""
                @click="deleteCommentReq(comment.id)"
                >刪除留言</el-button
              >
              <CommentCard :comment="comment" />
            </div>
          </div>
        </div>
        <div v-else>
          <p>Loading Comment...</p>
        </div>
        <!-- <el-button type="primary">新增留言</el-button> -->
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import PostCard from "~/components/PostCard.vue";

definePageMeta({
  middleware: "auth",
});

const dialogVisible1 = ref(false);
const dialogVisible2 = ref(false);
const textarea1 = ref("");
const textarea2 = ref("");
const user = useState("user");
const userId = ref("");
watch(
  () => user.value,
  (newUser) => {
    if (newUser) {
      userId.value = newUser.id;
    }
  }
);

const route = useRoute();
const router = useRouter();
const post = ref(null);
const authorName = ref(null);
const authorId = ref(null);
const comments = ref(null);
const holdCommentId = ref(null);

const params = {
  postId: route.params.id,
};

// alert and delete comment
const deleteCommentReq = async (commentId) => {
  const action = await ElMessageBox.confirm("確定要刪除留言嗎?", "刪除留言", {
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    type: "warning",
  });
  if (action === "confirm") {
    const response = await fetch(`/api/posts/delete-comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId }),
    });
    const data = await response.json();
    if (data.success) {
      ElMessage.success("刪除留言成功");
      const responseComment = await fetch("/api/posts/get-comment-by-Id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      comments.value = await responseComment.json();
    } else {
      ElMessage.error("Failed to delete comment");
    }
  }else{
    ElMessage.error("留言刪除失敗");
  }
};

const updateComment = async () => {
  const response = await fetch(`/api/posts/update-comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      commentId: holdCommentId.value,
      content: textarea2.value,
    }),
  });
  const data = await response.json();
  dialogVisible2.value = false;
  if (data.success) {
    ElMessage.success("留言更新成功");
    textarea1.value = "";
    const responseComment = await fetch("/api/posts/get-comment-by-Id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    comments.value = await responseComment.json();
  } else {
    ElMessage.error("留言更新失敗");
  }
  dialogVisible2.value = false;
};

const updateCommentReq = (comment) => {
  dialogVisible2.value = true;
  textarea2.value = comment.content;
  holdCommentId.value = comment.id;
};

// function to add comment
const addComment = async () => {
  const response = await fetch(`/api/posts/create-new-comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId: route.params.id,
      content: textarea1.value,
      authorId: userId,
    }),
  });
  const data = await response.json();
  dialogVisible1.value = false;
  if (data.success) {
    ElMessage.success("新增留言成功");
    textarea1.value = "";
    const responseComment = await fetch("/api/posts/get-comment-by-Id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    comments.value = await responseComment.json();
  } else {
    ElMessage.error("新增留言失敗");
  }
  dialogVisible1.value = false;
};

// function to report comment
const reportComment = async (commentId) => {
  const { value: reason } = await ElMessageBox.prompt(
    "請輸入檢舉原因",
    "檢舉留言",
    {
      confirmButtonText: "檢舉",
      cancelButtonText: "取消",
    }
  );
  if (reason) {
    const response = await fetch(`/api/posts/report-comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId, reason }),
    });
    const data = await response.json();
    if (data.success) {
      ElMessage.success("刪除留言成功");
    } else {
      ElMessage.error("刪除貼文失敗");
    }
  }
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
    ElMessage.success("刪除貼文成功");
    router.push("/my/posts/1");
  } else {
    ElMessage.error("刪除貼文失敗");
  }
};

// function to ask for the resons to report post by alert with input
const reportPost = async () => {
  const { value: reason } = await ElMessageBox.prompt(
    "請輸入檢舉原因",
    "檢舉貼文",
    {
      confirmButtonText: "檢舉",
      cancelButtonText: "取消",
    }
  );
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
      ElMessage.success("檢舉貼文成功");
    } else {
      ElMessage.error("檢舉貼文失敗");
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
.content .createComment {
  width: 100%;
  max-width: 800px;
  padding: 20px;
}
</style>

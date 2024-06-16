<template>
  <div class="content">
    <div class="infinite-scroll">
      <div v-if="comments">
        <div v-if="comments.length === 0">
          <p>沒有評論需要審核</p>
        </div>
        <div v-for="comment in comments" :key="comment.id">
          <NuxtLink :to="{ path: `/posts/${comment.postId}/checkComment`, query: { id: comment.id } }">
            <CommentCard :comment="comment" />
          </NuxtLink>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
    <div class="pagination">
      <div v-if="numberOfComments">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="numberOfComments * 10"
          :current-page="currentPage * 1"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import CommentCard from "~/components/CommentCard.vue";

const route = useRoute();
const router = useRouter();
const comments = ref(null);
const numberOfComments = ref(null);
const currentPage = ref(1);

currentPage.value = route.params.id || 1;

const handlePageChange = (page) => {
  router.push(`/posts/managementComment/${page}`);
};

const params = {
  skip: currentPage.value * 10 - 10 || 0,
  take: 10,
  thestatus: ["REPORTED"],
  ids: null,
};

const params2 = {
  thestatus: ["REPORTED"],
};

onMounted(async () => {
  const responseComment = await fetch("/api/posts/get-n-comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (responseComment.ok) {
    const responseData = await responseComment.json();
    if (responseData.statusCode === 200) {
      comments.value = responseData.body;
    } else {
      console.error("Failed to fetch posts:", responseData);
    }
  } else {
    console.error("Failed to fetch comments: HTTP status", responseComment.status);
  }

  const responseNumberOfComment = await fetch("/api/posts/get-number-of-comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params2),
  });
  numberOfComments.value = await responseNumberOfComment.json();
  numberOfComments.value = Math.ceil(numberOfComments.value / 10);
});

definePageMeta({
  middleware: "auth",
});
</script>

<style>
.content {
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.content .infinite-scroll {
  width: 100%;
  max-width: 800px;
  padding: 20px;
  flex-basis: 100%;
}
.content .pagination {
  width: 100%;
  max-width: 800px;
  padding: 20px;
  flex-basis: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block-end: 50px;
}
</style>

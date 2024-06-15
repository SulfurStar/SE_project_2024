<template>
  <div class="content">
    <div class="infinite-scroll">
      <div v-if="posts">
        <div v-for="post in posts" :key="post.id">
          <PostTitleCard :post="post" />
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
    <div class="pagination">
      <div v-if="numberOfPosts">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="numberOfPosts * 10"
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
import PostTitleCard from "~/components/PostTitleCard.vue";

const route = useRoute();
const router = useRouter();
const posts = ref(null);
const numberOfPosts = ref(null);
const currentPage = ref(1);
currentPage.value = route.params.id || 1;

const handlePageChange = (page) => {
  router.push(`/posts/overview/${page}`);
};

const params = {
  skip: currentPage.value * 10 - 10 || 0,
  take: 10,
  thestatus: ["NORMAL", "REPORTED"],
};

const params2 = {
  thestatus: ["NORMAL", "REPORTED"],
};

onMounted(async () => {
  const responsePost = await fetch("/api/posts/get-n-posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  posts.value = await responsePost.json();

  const responseNumberOfPost = await fetch("/api/posts/get-number-of-posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params2),
  });
  numberOfPosts.value = await responseNumberOfPost.json();
  numberOfPosts.value = Math.ceil(numberOfPosts.value / 10);
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

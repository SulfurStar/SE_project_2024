<template>
  <div v-if="post">
    <div class="content">
      <div class="PostCard">
        <NuxtLink :to="`/posts/${post.id}/edit`">Edit</NuxtLink>
        <PostCard :post="post" :authorname="authorName" />
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
import PostCard from "~/components/PostCard.vue";

const route = useRoute();
const post = ref(null);
const authorName = ref(null);
const comments = ref(null);

const params = {
  postId: route.params.id,
};

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

<template>
  <div v-if="post">
    <div class="content">
      <div class="PostCard">
        <NuxtLink :to="`/posts/${post.id}/edit`">Edit</NuxtLink>
        <PostCard :post="post" />
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
  
<script setup>
  import PostCard from '~/components/PostCard.vue'
  import { useRoute } from 'vue-router'
  import { ref, onMounted } from 'vue'
  
  const route = useRoute()
  const post = ref(null)
  
  onMounted(async () => {
    const postId = route.params.id
    const response = await fetch(`/api/posts/${postId}`)
    post.value = await response.json()
  })
</script>

<style >
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
</style>
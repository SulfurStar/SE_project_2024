<template>
  <div class="content">
    <div class="infinite-scroll">
      <el-row :gutter="20">
        <el-col :span="24" v-for="post in posts" :key="post.id">
          <PostTitleCard :post="post" />
        </el-col>
      </el-row>
      <el-infinite-scroll
        v-if="!loading"
        :disabled="!hasMore"
        :distance="10"
        @infinite="loadMore"
      />
      <el-loading v-if="loading" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import PostTitleCard from '~/components/PostTitleCard.vue'
import { ElInfiniteScroll, ElLoading, ElRow, ElCol, ElCard } from 'element-plus'

export default {
  components: {
    PostTitleCard
  },
  setup() {
    const posts = ref([])
    const loading = ref(false)
    const hasMore = ref(true)
    let page = 1

    const fakeApiData = [
      {
        id: 1,
        title: "這邊宿舍真的超推!!!",
        content: "This is the content of the first post.",
        imageUrl: "https://via.placeholder.com/150",
        createdAt: "2024-06-01T00:00:00Z",
        author: { name: "小明" },
        status: "NORMAL"
      },
      {
        id: 2,
        title: "求租屋推薦 預算4000/月",
        content: "This is the content of the second post.",
        imageUrl: "https://via.placeholder.com/150",
        createdAt: "2024-06-02T00:00:00Z",
        author: { name: "阿強" },
        status: "NORMAL"
      },
      {
        id: 2,
        title: "拜託不要租這間",
        content: "This is the content of the second post.",
        imageUrl: "https://via.placeholder.com/150",
        createdAt: "2024-06-02T00:00:00Z",
        author: { name: "Author 2" },
        status: "NORMAL"
      },
      {
        id: 2,
        title: "Second Post",
        content: "This is the content of the second post.",
        imageUrl: "https://via.placeholder.com/150",
        createdAt: "2024-06-02T00:00:00Z",
        author: { name: "Author 2" },
        status: "NORMAL"
      }
    ]

    const fetchPosts = async (page) => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500))
        return fakeApiData.map(post => ({ ...post, id: post.id + (page - 1) * fakeApiData.length }))
      } catch (error) {
        console.error('Failed to fetch posts:', error)
        return []
      }
    }

    // const fetchPosts = async (page) => {
    //   try {
    //     const response = await fetch(`https://api.example.com/posts?page=${page}`)
    //     const data = await response.json()
    //     return data
    //   } catch (error) {
    //     console.error('Failed to fetch posts:', error)
    //     return []
    //   }
    // }

    const loadMore = async () => {
      if (loading.value || !hasMore.value) return

      loading.value = true
      const newPosts = await fetchPosts(page)
      if (newPosts.length > 0) {
        posts.value = [...posts.value, ...newPosts]
        page += 1
      } else {
        hasMore.value = false
      }
      loading.value = false
    }

    onMounted(loadMore)

    return {
      posts,
      loading,
      hasMore,
      loadMore
    }
  }
}
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  margin: 0;
  padding: 0;
}
.post-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 20px;
}
.content {
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content .infinite-scroll {
  width: 100%;
  max-width: 800px;
  padding: 20px;
}

</style>
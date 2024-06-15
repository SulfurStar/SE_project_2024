<template>
    <el-card class="comment-card">
            <div class="comment-header">
                <h2 class="comment-title">{{ comment.content }}</h2>
                <div v-if="commentA" class="comment-date"> {{ commentA.name }} commented on: {{ new Date(comment.createdAt).toLocaleDateString() }}</div>
            </div>
    </el-card>
</template>

<script>
export default {
  name: 'CommentTitleCard',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      commentA: null
    };
  },
  mounted() {
    if (this.comment.authorId) {
      this.fetchCommentAuthor();
    }
  },
  methods: {
    async fetchCommentAuthor() {
      try {
        const response = await fetch(`/api/posts/get-comment-author-by-Id`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ authorId: this.comment.authorId }),
        });
        this.commentA = await response.json();
        // console.log(this.commentA);
      } catch (error) {
        console.error('Error fetching comment author:', error);
      }
    }
  },
};
</script>

<style scoped>
.comment-card {
    margin-bottom: 20px;
}
.comment-header, .comment-footer {
    padding: 16px;
    background-color: #f9f9f9;
}
.comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    text-align: right;
    /* border-bottom: 1px solid #eaeaea; */
}
.comment-date {
    font-size: 0.8em;
    color: #999;
}
.comment-title {
    margin: 0;
    font-size: 1.5em;
    color: #333;
}

</style>
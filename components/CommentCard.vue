<template>
    <el-card class="comment-card">
            <div class="comment-header">
                <h2 class="comment-title">{{ comment.content }}</h2>
                <div class="comment-date">commented on: {{ new Date(comment.createdAt).toLocaleDateString() }}</div>
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
  }
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
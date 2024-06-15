<template>
    <el-card class="comment-card">
            <div class="comment-header">
                <h2 class="comment-title">{{ comment.content }}</h2>
            </div>
            <div class="comment-footer">
                <el-icon :size="20" color="" class="report-icon"><WarningFilled /></el-icon>
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
    border-bottom: 1px solid #eaeaea;
}
.comment-title {
    margin: 0;
    font-size: 1.5em;
    color: #333;
}
.comment-author, .comment-status {
    margin: 4px 0;
    font-size: 0.9em;
    color: #20e086;
}
.comment-body {
    padding: 16px;
}
.comment-content {
    margin: 0 0 16px;
    color: #333;
}
.comment-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
}
.comment-footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    text-align: right;
    font-size: 0.8em;
    color: #999;
}
</style>
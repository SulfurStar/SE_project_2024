<template>
  <div class="home">
    <!-- 大照片部分 -->
    <div class="hero">
      <img src="https://i.pinimg.com/originals/b2/b9/12/b2b9128b7e56515f4f6b5317a58ba1af.jpg" alt="大照片">
    </div>

    <!-- 功能連結部分 -->
    <div class="features">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="feature-card" @click="goToPage('/Ad/overview/1')">
            <template #header>
        <div  class="feature-title">租屋廣告</div>
        </template>
            <div class="feature-description">找你的下一個家，從這裡開始。</div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="feature-card" @click="goToPage('/visitation')">
            <template #header>
        <div  class="feature-title">訪視調查</div>
        </template>
            <div class="feature-description">每一次交流都值得信賴。</div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="feature-card" @click="goToPage('/posts')">
            <template #header>
        <div  class="feature-title">貼文區</div>
        </template>
            <div class="feature-description">留言，讓我們聽見你的心聲。</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToPage(path) {
      // 這裡可以使用Nuxt.js的路由功能跳轉到指定的路徑
      this.$router.push(path);
    }
  }
};
</script>

<style scoped>
.home {
  padding: 0px;
}

.hero img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 20px;
}

.features {
  padding : 20px;
  margin-top: 20px;
}

.feature-card {
  cursor: pointer;
}

.feature-icon {
  width: 60px;
  height: 60px;
  margin: 20px auto;
}

.feature-title {
  font-size: 18px;
  font-weight: bold;
}

.feature-description {
  margin-top: 10px;
}
</style>